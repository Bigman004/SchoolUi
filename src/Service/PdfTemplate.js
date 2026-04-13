import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;
pdfMake.vfs = pdfFonts.pdfMake?.vfs ?? pdfFonts;

// ── Data ─────────────────────────────────────────────────────
export const generateResult = (resultData) => {
  let { id, studentId, term, type, ...result } = resultData.examResult;
  const student = {
    name: resultData.studentFirstName + " " + resultData.studentLastName,
    id: resultData.regNumber,
    class: resultData.studentClass,
    term: resultData.examResult.term,
    session: "2025/2026",
  };
  let results = [];

  for (const key in result) {
    results.push({
      name: key
        .replace(/([A-Z])/g, " $1") // 'basic Science'
        .replace(/^./, (c) => c.toUpperCase()),
      ca: resultData.testResult[key],
      exam: resultData.examResult[key],
      total: resultData.examResult[key] + resultData.testResult[key],
      grade: (() => {
        const total = resultData.examResult[key] + resultData.testResult[key];
        if (total >= 90) return "A";
        if (total >= 80) return "B";
        if (total >= 70) return "C";
        if (total >= 60) return "D";
        return "F";
      })(),
    });
  }
  const subjects = results;

  const average = (
    subjects.reduce((s, r) => s + r.total, 0) / subjects.length
  ).toFixed(1);

  // ── Table ─────────────────────────────────────────────────────
  const tableBody = [
    [
      { text: "Subject", style: "th" },
      { text: "CA", style: "th" },
      { text: "Exam", style: "th" },
      { text: "Total", style: "th" },
      { text: "Grade", style: "th" },
    ],
    ...subjects.map((s) => [
      s.name,
      { text: s.ca, alignment: "center" },
      { text: s.exam, alignment: "center" },
      { text: s.total, bold: true, alignment: "center" },
      {
        text: s.grade,
        bold: true,
        alignment: "center",
        color: s.grade === "A" ? "green" : s.grade === "F" ? "red" : "#1a3c6e",
      },
    ]),
  ];

  // ── Document ──────────────────────────────────────────────────
  const doc = {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 50],
    footer: (page, count) => ({
      text: `Page ${page} of ${count}`,
      alignment: "center",
      fontSize: 8,
      color: "#888",
      margin: [0, 10],
    }),
    content: [
      { text: "APEX ACADEMY", style: "school" },
      { text: "Student Result Sheet", style: "title" },
      {
        text: `${student.term}  |  ${student.session}`,
        alignment: "center",
        color: "#555",
        fontSize: 10,
        margin: [0, 0, 0, 12],
      },

      {
        columns: [
          {
            stack: [
              { text: "Student", style: "label" },
              { text: student.name, bold: true },
              { text: `ID: ${student.id}` },
              { text: `Class: ${student.class}` },
            ],
          },
          {
            stack: [
              { text: "Summary", style: "label" },
              { text: `Average: ${average}%`, bold: true },
              { text: `Subjects: ${subjects.length}` },
            ],
            alignment: "right",
          },
        ],
        margin: [0, 0, 0, 14],
      },

      { text: "Subject Results", style: "section" },
      {
        table: {
          headerRows: 1,
          widths: ["*", 40, 40, 50, 40],
          body: tableBody,
        },
        layout: {
          hLineColor: () => "#ddd",
          vLineWidth: () => 0,
          fillColor: (row) => (row === 0 ? "#1a3c6e" : null),
        },
        margin: [0, 0, 0, 14],
      },

      { text: "Teacher's Remark", style: "section" },
      {
        text: "_______________________________________________",
        color: "#ccc",
      },
      { text: "", margin: [0, 8] },
      { text: "Principal's Signature", style: "section" },
      {
        text: "_______________________________________________",
        color: "#ccc",
      },
    ],
    styles: {
      school: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        color: "#1a3c6e",
        margin: [0, 0, 0, 2],
      },
      title: { fontSize: 13, alignment: "center", margin: [0, 2, 0, 4] },
      section: {
        fontSize: 10,
        bold: true,
        color: "#1a3c6e",
        margin: [0, 0, 0, 4],
      },
      label: { fontSize: 8, color: "#888", margin: [0, 0, 0, 2] },
      th: { bold: true, color: "#fff", fontSize: 9, margin: [4, 5] },
    },
  };

  pdfMake.createPdf(doc).download("result.pdf");
};
