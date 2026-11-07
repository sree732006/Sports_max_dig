# Website CTA Audit Report Generator

A production-grade Python tool that audits any public web domain's Calls-to-Action (CTAs), lead funnels, and conversion mechanics using headless Playwright Chromium and generates an executive-ready landscape A4 PDF infographic report with high-res PNG previews, structured JSON metrics, and CSV finding logs.

---

## 🛠 Features

- **Safe, Read-Only Public DOM Inspection**:
  - Headless Chromium crawling with rate limits and robots compliance.
  - Zero form submissions, no spamming, and zero data modification.
- **Deep DOM Extraction**:
  - Captures CTA labels, element tags (`<a>`, `<button>`, `role="button"`), destination URLs, visual dimensions (`width`, `height`, `area`), location (`hero/above_fold`, `header/nav`, `body`, `footer`), color contrast, and adjacent social proof tokens.
- **Deterministic 0–100 Scoring Engine**:
  - **Overall CTA Score**: Weighted composite of core categories.
  - **First Impression (25%)**: Hero section CTA clarity, action verbs, contrast.
  - **Lead Capture (20%)**: Conversion triggers, form friction, dedicated paths.
  - **Trust Building (20%)**: Social proof adjacency, security badges, risk-reversal copy.
  - **Sales Funnel (35%)**: Primary vs. secondary visual hierarchy, navigation flow.
- **Executive Visual Report**:
  - One-page landscape A4 executive PDF infographic with custom score gauges, evidence cards, placement matrix, top 5 priority fixes, hypothetical scenario impact modeling, and 4-step action roadmap.
- **Deliverables**:
  - `output/cta_audit_report.pdf`
  - `output/cta_audit_preview.png`
  - `output/audit_data.json`
  - `output/cta_findings.csv`
  - `output/page_inventory.csv`

---

## 📦 Requirements & Installation

1. **Python 3.10+** (Tested on Python 3.11).
2. Install Python dependencies:
   ```bash
   pip install -r cta_audit_tool/requirements.txt
   ```
3. Install the Playwright Chromium browser binaries:
   ```bash
   python -m playwright install chromium
   ```

---

## 🚀 Execution

Run an audit against any website URL:

```bash
# Audit the SportsMax platform
python cta_audit_tool/main.py --url https://sports-max-dig.vercel.app --output output/ --max-pages 6
```

### CLI Arguments:
- `--url`: The target website URL (e.g. `https://sports-max-dig.vercel.app`).
- `--output`: Output directory where reports and CSVs are saved (default: `output/`).
- `--max-pages`: Maximum number of discoverable internal pages to crawl (default: `6`).

---

## 📊 Output Artifacts

| File | Description |
| :--- | :--- |
| `output/cta_audit_report.pdf` | Formatted landscape A4 executive infographic report. |
| `output/cta_audit_preview.png` | 300 DPI high-resolution PNG render of the PDF page. |
| `output/audit_data.json` | Complete machine-readable audit scores, inventory, and DOM elements. |
| `output/cta_findings.csv` | Granular table of observed strengths, friction gaps, and priority fixes. |
| `output/page_inventory.csv` | Scanned URLs, HTTP response codes, load times, and CTA counts. |
| `output/screenshots/` | Full desktop viewport screenshots of crawled pages. |

