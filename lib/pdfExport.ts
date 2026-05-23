import jsPDF from "jspdf";

type PdfReportData = {
  companyName: string;
  industry: string;
  frameworkName: string;
  score: number;
  riskRating: string;
  riskSummary: string;
  missingPolicies: string[];
  missingTechnicalControls: string[];
  evidenceChecklist: string[];
  roadmap: {
    thirtyDays: string[];
    sixtyDays: string[];
    ninetyDays: string[];
  };
};

function addWrappedText(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const lines = pdf.splitTextToSize(text, maxWidth);
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function checkPage(pdf: jsPDF, y: number) {
  if (y > 270) {
    pdf.addPage();
    return 20;
  }
  return y;
}

export function exportReadinessReportToPDF(data: PdfReportData) {
  const pdf = new jsPDF("p", "mm", "a4");

  let y = 20;
  const margin = 16;
  const maxWidth = 178;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("AuditReady AI", margin, y);

  y += 9;
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");
  pdf.text("Compliance Readiness Report", margin, y);

  y += 14;
  pdf.setDrawColor(15, 23, 42);
  pdf.line(margin, y, 194, y);

  y += 12;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Organization Overview", margin, y);

  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(`Company: ${data.companyName}`, margin, y);
  y += 7;
  pdf.text(`Industry: ${data.industry}`, margin, y);
  y += 7;
  pdf.text(`Framework: ${data.frameworkName}`, margin, y);

  y += 12;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Readiness Score", margin, y);

  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(`Overall Score: ${data.score}%`, margin, y);
  y += 7;
  pdf.text(`Risk Rating: ${data.riskRating}`, margin, y);

  y += 12;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Risk Summary", margin, y);

  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  y = addWrappedText(pdf, data.riskSummary, margin, y, maxWidth, 6);

  y += 10;
  y = checkPage(pdf, y);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Missing Policies", margin, y);

  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  data.missingPolicies.forEach((item) => {
    y = checkPage(pdf, y);
    y = addWrappedText(pdf, `• ${item}`, margin, y, maxWidth, 6);
  });

  y += 8;
  y = checkPage(pdf, y);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Missing Technical Controls", margin, y);

  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  data.missingTechnicalControls.forEach((item) => {
    y = checkPage(pdf, y);
    y = addWrappedText(pdf, `• ${item}`, margin, y, maxWidth, 6);
  });

  y += 8;
  y = checkPage(pdf, y);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Evidence Checklist", margin, y);

  y += 8;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  data.evidenceChecklist.forEach((item) => {
    y = checkPage(pdf, y);
    y = addWrappedText(pdf, `• ${item}`, margin, y, maxWidth, 6);
  });

  y += 8;
  y = checkPage(pdf, y);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("30/60/90-Day Remediation Roadmap", margin, y);

  y += 10;
  const roadmapSections = [
    ["First 30 Days", data.roadmap.thirtyDays],
    ["Next 60 Days", data.roadmap.sixtyDays],
    ["Next 90 Days", data.roadmap.ninetyDays],
  ] as const;

  roadmapSections.forEach(([title, items]) => {
    y = checkPage(pdf, y);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(title, margin, y);

    y += 7;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    items.forEach((item) => {
      y = checkPage(pdf, y);
      y = addWrappedText(pdf, `• ${item}`, margin, y, maxWidth, 6);
    });

    y += 5;
  });

  pdf.save("AuditReady-AI-Readiness-Report.pdf");
}