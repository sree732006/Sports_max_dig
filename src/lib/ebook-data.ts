/**
 * SportsMax e-book metadata and chapter structure
 */

export const EBOOK_META = {
  title: "SportsMax: Full-Spectrum Sports AI Engineering & Performance Intelligence",
  subtitle: "Architectural Foundations, Computer Vision Kinematics, Predictive Biometrics, and Enterprise Sports Tech",
  edition: "2026 Reference Edition · Comprehensive 45-Page Technical Treatise",
  author: "SportsMax Engineering Labs & Sports Science Directorate",
  organization: "SportsMax Performance Systems",
  publicationDate: "November 2026",
  license: "Enterprise Technical Whitepaper & Field Guide",
  url: "https://sports-max-dig.vercel.app/",
  targetPages: "40-50 Pages",
  formatting: {
    font: "Times New Roman (Standard Adobe Type-1 Times-Roman / Times-Bold / Times-Italic)",
    fontSize: "11pt / 12pt body text",
    lineSpacing: "1.5 line height (18pt pitch)",
    alignment: "Full Justification with dynamic word-spacing calculation",
    margins: "Left: 54pt (0.75 in), Right: 54pt, Top: 54pt, Bottom: 54pt",
    pageSize: "A4 (595.28 x 841.89 pt)"
  }
};

export interface Chapter {
  id: number;
  number: string;
  title: string;
  summary: string;
  subsections: {
    heading: string;
    paragraphs: string[];
    callout?: {
      title: string;
      metrics: string[];
    };
  }[];
}

