/**
 * SportsVectors e-book generation & trigger client utility.
 * Allows instant direct download of the generated PDF from the frontend.
 */

export interface EbookDownloadOptions {
  filename?: string;
  source?: string;
}

export function downloadSportsVectorsEbook(options: EbookDownloadOptions = {}) {
  const filename = options.filename || "SportsVectors_AI_Engineering_Performance_Intelligence_EBook.pdf";
  const pdfUrl = "/SportsVectors_AI_Engineering_Performance_Intelligence_EBook.pdf";

  // Trigger browser download directly from the public asset
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = filename;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

