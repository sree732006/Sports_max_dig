
/**
 * SportsMax Security Controller
 * Shared security helpers for server-side API endpoints.
 */

export type SecurityCheckResult = {
  allowed: boolean;
  status: 400 | 401 | 403 | 429;
  message: string;
};

/** Check allowed HTTP methods. */
export function checkHttpMethod(
  request: Request,
  allowedMethods: string[],
): SecurityCheckResult {
  if (!allowedMethods.includes(request.method.toUpperCase())) {
    return {
      allowed: false,
      status: 403,
      message: "HTTP method not allowed.",
    };
  }

  return {
    allowed: true,
    status: 400,
    message: "Request method accepted.",
  };
}

/** Validate required text input. */
export function validateRequiredText(
  value: unknown,
  maxLength = 200,
): SecurityCheckResult {
  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    value.trim().length > maxLength
  ) {
    return {
      allowed: false,
      status: 400,
      message: "Invalid or missing input.",
    };
  }

  return {
    allowed: true,
    status: 400,
    message: "Input accepted.",
  };
}

/** Validate a Bearer token against a server-side secret. */
export function checkBearerToken(
  request: Request,
  expectedSecret: string | undefined,
): SecurityCheckResult {
  if (!expectedSecret) {
    return {
      allowed: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  const authorization = request.headers.get("authorization") || "";
  const match = /^Bearer\s+(\S+)$/i.exec(authorization);

  if (!match || match[1] !== expectedSecret) {
    return {
      allowed: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  return {
    allowed: true,
    status: 400,
    message: "Authentication accepted.",
  };
}

/** Build a standard JSON security response. */
export function securityErrorResponse(
  status: SecurityCheckResult["status"],
  message: string,
): Response {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
