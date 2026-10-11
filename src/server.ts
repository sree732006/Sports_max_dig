import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Secured Server Endpoint: /api/reports/trigger
      if (url.pathname === "/api/reports/trigger" && (request.method === "POST" || request.method === "GET")) {
        const cronSecret = process.env["REPORT_CRON_SECRET"] || process.env["CRON_SECRET"];
        if (!cronSecret) {
          console.error("[Report Scheduler] Rejecting request: Neither REPORT_CRON_SECRET nor CRON_SECRET environment variable is configured.");
          return new Response(JSON.stringify({ error: "Server misconfiguration: Cron secret is not configured on the server." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        const authHeader = request.headers.get("authorization") || "";
        const token = authHeader.replace(/^Bearer\s+/i, "") || url.searchParams.get("secret") || "";

        if (!token || token !== cronSecret) {
          return new Response(JSON.stringify({ error: "Unauthorized: Invalid or missing cron secret" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        let body: any = {};
        if (request.method === "POST") {
          try {
            body = await request.json();
          } catch {
            // fallback
          }
        } else {
          // Vercel Cron triggers via GET with query params (e.g. ?period=daily)
          const qPeriod = url.searchParams.get("period") as "daily" | "weekly" | "monthly" | null;
          body = {
            period: qPeriod || "daily",
            reportId: `${qPeriod || "daily"}-scheduled`,
            reportName: `${(qPeriod || "daily").toUpperCase()} Analytics Report`,
          };
        }

        const recipientEmail = process.env["REPORT_RECIPIENT_EMAIL"] || "sreevarthini2006@gmail.com";
        const { executeServerReport } = await import("./lib/server-reporting");
        const report = await executeServerReport({
          reportId: body.reportId || "daily-traffic",
          period: body.period || "daily",
          reportName: body.reportName || "Daily Performance Report",
          recipients: body.recipients || [recipientEmail],
        });

        return new Response(JSON.stringify({ success: true, report }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }

      // Secured Server Endpoint: /api/reports/logs
      if (url.pathname === "/api/reports/logs" && request.method === "GET") {
        const { getExecutionHistory } = await import("./lib/server-reporting");
        return new Response(JSON.stringify({ logs: getExecutionHistory() }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }

      // Server Endpoint: /api/jira/issues — proxies Jira REST API using server-side credentials
      if (url.pathname === "/api/jira/issues" && request.method === "GET") {
        const domain = process.env["JIRA_DOMAIN"];
        const email = process.env["JIRA_EMAIL"];
        const token = process.env["JIRA_API_TOKEN"];
        const project = process.env["JIRA_PROJECT_KEY"] || "KAN";

        if (!domain || !email || !token) {
          return new Response(
            JSON.stringify({ error: "Jira credentials are not configured on the server.", issues: [] }),
            { status: 503, headers: { "content-type": "application/json" } }
          );
        }

        const maxResults = Math.min(Number(url.searchParams.get("maxResults") || "50"), 100);
        const startAt = Number(url.searchParams.get("startAt") || "0");
        const statusFilter = url.searchParams.get("status") || "";
        const jql = statusFilter
          ? `project = ${project} AND status = "${statusFilter}" ORDER BY created DESC`
          : `project = ${project} ORDER BY created DESC`;

        const auth = Buffer.from(`${email}:${token}`).toString("base64");
        const headers = {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        };

        // Try /rest/api/3/search/jql (Atlassian's current standard endpoint)
        const primaryUrl =
          `https://${domain}/rest/api/3/search/jql?jql=${encodeURIComponent(jql)}` +
          `&maxResults=${maxResults}&startAt=${startAt}` +
          `&fields=summary,status,assignee,priority,created,updated,issuetype,labels,description`;

        let jiraResponse = await fetch(primaryUrl, {
          method: "GET",
          headers,
        });

        // Fallback to legacy /rest/api/3/search if needed
        if (jiraResponse.status === 404 || jiraResponse.status === 410) {
          const fallbackUrl =
            `https://${domain}/rest/api/3/search?jql=${encodeURIComponent(jql)}` +
            `&maxResults=${maxResults}&startAt=${startAt}` +
            `&fields=summary,status,assignee,priority,created,updated,issuetype,labels,description`;
          jiraResponse = await fetch(fallbackUrl, {
            method: "GET",
            headers,
          });
        }

        if (!jiraResponse.ok) {
          const errText = await jiraResponse.text();
          console.error(`[Jira API] Error ${jiraResponse.status}: ${errText}`);
          let parsedError = `Jira API returned HTTP ${jiraResponse.status}`;
          try {
            const errJson = JSON.parse(errText) as { errorMessages?: string[]; message?: string };
            if (errJson.errorMessages && errJson.errorMessages.length > 0) {
              parsedError = errJson.errorMessages[0]!;
            } else if (errJson.message) {
              parsedError = errJson.message;
            }
          } catch {
            // keep default parsedError
          }
          return new Response(
            JSON.stringify({ error: parsedError, issues: [], status: jiraResponse.status }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        }

        const jiraData = await jiraResponse.json() as {
          total: number;
          startAt: number;
          maxResults: number;
          issues: Array<{
            id: string;
            key: string;
            fields: {
              summary: string;
              status: { name: string; statusCategory: { colorName: string } };
              assignee: { displayName: string; emailAddress: string } | null;
              priority: { name: string; iconUrl: string } | null;
              created: string;
              updated: string;
              issuetype: { name: string; iconUrl: string };
              labels: string[];
            };
          }>;
        };

        const issues = (jiraData.issues || []).map((issue) => ({
          id: issue.id,
          key: issue.key,
          summary: issue.fields.summary,
          status: issue.fields.status?.name ?? "Unknown",
          statusColor: issue.fields.status?.statusCategory?.colorName ?? "default",
          assignee: issue.fields.assignee?.displayName ?? null,
          priority: issue.fields.priority?.name ?? null,
          issueType: issue.fields.issuetype?.name ?? "Task",
          created: issue.fields.created,
          updated: issue.fields.updated,
          labels: issue.fields.labels ?? [],
          url: `https://${domain}/browse/${issue.key}`,
        }));

        return new Response(
          JSON.stringify({ total: jiraData.total, startAt: jiraData.startAt, issues }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }

      // Server Endpoint: /api/sheets/dashboard — fetches Google Sheets summary data
      if (url.pathname === "/api/sheets/dashboard" && request.method === "GET") {
        const sheetsUrl = process.env["VITE_ANALYTICS_URL"];
        if (!sheetsUrl) {
          return new Response(
            JSON.stringify({ error: "Google Sheets URL not configured.", connected: false }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        }

        try {
          const sheetsResponse = await fetch(`${sheetsUrl}?action=dashboard`, {
            method: "GET",
            headers: { Accept: "application/json" },
          });

          if (!sheetsResponse.ok) {
            throw new Error(`Sheets responded with ${sheetsResponse.status}`);
          }

          const data = await sheetsResponse.json();
          return new Response(
            JSON.stringify({ connected: true, data }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        } catch (err) {
          console.error("[Sheets Dashboard] Fetch failed:", err);
          // If upstream fetch failed (e.g. captive portal or certificate issue), try reading local recorded snapshot
          try {
            const fs = await import("fs/promises");
            const path = await import("path");
            const snapshotPath = path.resolve(process.cwd(), "gas_dash.json");
            const content = await fs.readFile(snapshotPath, "utf-8");
            const data = JSON.parse(content);
            return new Response(
              JSON.stringify({ connected: true, data, isCached: true }),
              { status: 200, headers: { "content-type": "application/json" } }
            );
          } catch {
            return new Response(
              JSON.stringify({ connected: false, error: String(err) }),
              { status: 200, headers: { "content-type": "application/json" } }
            );
          }
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
