import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake?.vfs ?? pdfFonts.vfs ?? pdfFonts;

// ── Constants ──────────────────────────────────────────────────────────────────
const COLORS = {
  primary: "#1B3F6E",
  accent: "#E8912D",
  headerText: "#FFFFFF",
  bodyText: "#1A1A2E",
  muted: "#6B7280",
  border: "#D1D5DB",
  rowAlt: "#F8FAFC",
  gradeA: "#15803D",
  gradeB: "#1D4ED8",
  gradeC: "#7C3AED",
  gradeD: "#B45309",
  gradeF: "#DC2626",
  divider: "#E5E7EB",
};

const FONT_SIZES = {
  school: 18,
  tagline: 9,
  title: 13,
  section: 10,
  label: 8,
  body: 9,
  small: 7.5,
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function getGrade(total) {
  if (total >= 90)
    return { grade: "A", remark: "Excellent", color: COLORS.gradeA };
  if (total >= 80)
    return { grade: "B", remark: "Very Good", color: COLORS.gradeB };
  if (total >= 70) return { grade: "C", remark: "Good", color: COLORS.gradeC };
  if (total >= 60) return { grade: "D", remark: "Pass", color: COLORS.gradeD };
  return { grade: "F", remark: "Fail", color: COLORS.gradeF };
}

function formatSubjectName(key) {
  // Only split on true camelCase boundaries (lowercase → uppercase)
  // "basicScience" → "Basic Science"  |  "CRK" → "CRK"
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function getOverallRemark(average) {
  if (average >= 90)
    return "Outstanding performance. Keep up the excellent work!";
  if (average >= 80) return "Very commendable performance. Well done!";
  if (average >= 70) return "Good performance. Strive for more.";
  if (average >= 60) return "Satisfactory performance. Room for improvement.";
  return "Needs significant improvement. Please see the class teacher.";
}

function buildSubjects(examResult, testResult) {
  const SKIP_KEYS = new Set(["id", "studentId", "term", "type"]);
  return Object.keys(examResult)
    .filter((key) => !SKIP_KEYS.has(key))
    .map((key) => {
      const ca = testResult[key] ?? 0;
      const exam = examResult[key] ?? 0;
      const total = ca + exam;
      return {
        name: formatSubjectName(key),
        ca,
        exam,
        total,
        ...getGrade(total),
      };
    });
}

// ── Section Heading ────────────────────────────────────────────────────────────
function sectionHeading(label) {
  return {
    columns: [
      {
        canvas: [
          { type: "rect", x: 0, y: 5, w: 4, h: 12, r: 2, color: COLORS.accent },
        ],
        width: 10,
      },
      {
        text: label.toUpperCase(),
        fontSize: FONT_SIZES.section,
        bold: true,
        color: COLORS.primary,
        margin: [4, 3, 0, 0],
      },
    ],
    margin: [0, 12, 0, 6],
  };
}

// ── Divider ────────────────────────────────────────────────────────────────────
function divider() {
  return {
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 515,
        y2: 0,
        lineWidth: 0.5,
        lineColor: COLORS.divider,
      },
    ],
    margin: [0, 4, 0, 4],
  };
}

// ── Info Pill ──────────────────────────────────────────────────────────────────
function infoPill(label, value) {
  return {
    stack: [
      {
        text: label,
        fontSize: FONT_SIZES.small,
        color: COLORS.muted,
        margin: [0, 0, 0, 1],
      },
      {
        text: value || "—",
        fontSize: FONT_SIZES.body,
        bold: true,
        color: COLORS.bodyText,
      },
    ],
    margin: [0, 0, 12, 0],
  };
}

// ── Results Table ──────────────────────────────────────────────────────────────
function buildResultsTable(subjects) {
  const header = [
    { text: "Subject", style: "th" },
    { text: "CA\n(40)", style: "th", alignment: "center" },
    { text: "Exam\n(60)", style: "th", alignment: "center" },
    { text: "Total\n(100)", style: "th", alignment: "center" },
    { text: "Grade", style: "th", alignment: "center" },
    { text: "Remark", style: "th", alignment: "center" },
  ];

  const rows = subjects.map((s, i) => {
    const bg = i % 2 !== 0 ? COLORS.rowAlt : null;
    const cell = (content, extra = {}) => ({
      text: content,
      fillColor: bg,
      fontSize: FONT_SIZES.body,
      margin: [4, 4],
      ...extra,
    });

    return [
      cell(s.name, { bold: true }),
      cell(String(s.ca), { alignment: "center" }),
      cell(String(s.exam), { alignment: "center" }),
      cell(String(s.total), {
        alignment: "center",
        bold: true,
        color: s.total >= 60 ? COLORS.gradeA : COLORS.gradeF,
      }),
      cell(s.grade, { alignment: "center", bold: true, color: s.color }),
      cell(s.remark, { alignment: "center", color: s.color, italics: true }),
    ];
  });

  return {
    table: {
      headerRows: 1,
      widths: ["*", 50, 50, 60, 45, 65],
      body: [header, ...rows],
    },
    layout: {
      hLineWidth: (i, node) =>
        i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.3,
      vLineWidth: () => 0,
      hLineColor: (i) => (i === 0 || i === 1 ? COLORS.primary : COLORS.divider),
      fillColor: (row) => (row === 0 ? COLORS.primary : null),
      paddingLeft: () => 0,
      paddingRight: () => 0,
    },
    margin: [0, 0, 0, 8],
  };
}

// ── Signature Block ────────────────────────────────────────────────────────────
function signatureBlock(label) {
  return {
    stack: [
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 130,
            y2: 0,
            lineWidth: 0.8,
            lineColor: COLORS.border,
          },
        ],
        margin: [0, 18, 0, 3],
      },
      { text: label, fontSize: FONT_SIZES.small, color: COLORS.muted },
    ],
  };
}

// ── Header Banner ──────────────────────────────────────────────────────────────
function buildHeader(student) {
  return {
    table: {
      widths: [8, "*", "auto"],
      body: [
        [
          {
            text: "",
            fillColor: COLORS.accent,
            border: [false, false, false, false],
          },
          {
            stack: [
              {
                text: student.school,
                fontSize: FONT_SIZES.school,
                bold: true,
                color: COLORS.headerText,
              },
              {
                text: "OFFICIAL ACADEMIC RESULT SHEET",
                fontSize: FONT_SIZES.tagline,
                color: COLORS.accent,
                characterSpacing: 1.2,
                margin: [0, 3, 0, 0],
              },
            ],
            fillColor: COLORS.primary,
            border: [false, false, false, false],
            margin: [10, 14, 0, 14],
          },
          {
            stack: [
              {
                text: student.session,
                fontSize: 11,
                bold: true,
                color: COLORS.headerText,
                alignment: "right",
              },
              {
                text: student.term || "",
                fontSize: FONT_SIZES.small,
                color: COLORS.accent,
                alignment: "right",
                margin: [0, 3, 0, 0],
              },
            ],
            fillColor: COLORS.primary,
            border: [false, false, false, false],
            margin: [0, 14, 10, 14],
          },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },
    margin: [0, 0, 0, 16],
  };
}

// ── Student Info ───────────────────────────────────────────────────────────────
function buildStudentInfo(student) {
  return {
    columns: [
      infoPill("Full Name", student.name),
      infoPill("Registration No.", student.id),
      infoPill("Class", student.class),
    ],
    margin: [0, 0, 0, 4],
  };
}

// ── Main Export ────────────────────────────────────────────────────────────────
export const generateResult = (resultData) => {
  const { examResult, testResult } = resultData;

  const student = {
    name: `${resultData.studentFirstName} ${resultData.studentLastName}`.trim(),
    id: resultData.regNumber,
    class: resultData.studentClass,
    term: resultData.examResult.term,
    session: "2025/2026",
    school: resultData.schoolName,
  };

  const subjects = buildSubjects(examResult, testResult);
  const average = (
    subjects.reduce((s, r) => s + r.total, 0) / subjects.length
  ).toFixed(1);
  const overallRemark = getOverallRemark(parseFloat(average));
  const { grade: overallGrade, color: overallColor } = getGrade(
    parseFloat(average),
  );

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 50],

    footer: (currentPage, pageCount) => ({
      columns: [
        {
          text: `${student.school}  ·  ${student.term}  ·  ${student.session}`,
          fontSize: FONT_SIZES.small,
          color: COLORS.muted,
          margin: [40, 0, 0, 0],
        },
        {
          text: `Page ${currentPage} of ${pageCount}`,
          fontSize: FONT_SIZES.small,
          color: COLORS.muted,
          alignment: "right",
          margin: [0, 0, 40, 0],
        },
      ],
      margin: [0, 8, 0, 0],
    }),

    content: [
      // 1. Header
      buildHeader(student),

      // 2. Student Info
      sectionHeading("Student Information"),
      buildStudentInfo(student),
      divider(),

      // 3. Results Table
      sectionHeading("Academic Results"),
      buildResultsTable(subjects),

      // 4. Overall Average
      {
        columns: [
          { width: "*", text: "" },
          {
            columns: [
              {
                text: "OVERALL AVERAGE:",
                fontSize: FONT_SIZES.body,
                bold: true,
                color: COLORS.muted,
                margin: [0, 3, 8, 0],
              },
              {
                text: `${average}%  (${overallGrade})`,
                fontSize: 13,
                bold: true,
                color: overallColor,
              },
            ],
            alignment: "right",
          },
        ],
        margin: [0, 0, 0, 4],
      },
      {
        text: overallRemark,
        fontSize: FONT_SIZES.small,
        italics: true,
        color: overallColor,
        alignment: "right",
        margin: [0, 0, 0, 14],
      },

      divider(),

      // 5. Remarks & Signatures
      sectionHeading("Remarks & Authorisation"),
      {
        columns: [
          {
            stack: [
              {
                text: "Class Teacher's Remark",
                fontSize: FONT_SIZES.small,
                color: COLORS.muted,
                margin: [0, 0, 0, 4],
              },
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 220,
                    h: 32,
                    r: 4,
                    lineWidth: 0.5,
                    lineColor: COLORS.border,
                  },
                ],
              },
            ],
            width: 240,
          },
          { width: 20, text: "" },
          {
            stack: [
              signatureBlock("Class Teacher's Signature & Date"),
              {
                margin: [0, 10, 0, 0],
                ...signatureBlock("Principal's Signature & Date"),
              },
            ],
            width: "*",
          },
        ],
        margin: [0, 0, 0, 6],
      },

      divider(),
      {
        text: "This result is computer-generated and is valid without a physical stamp unless otherwise stated.",
        fontSize: FONT_SIZES.small,
        color: COLORS.muted,
        italics: true,
        alignment: "center",
        margin: [0, 4, 0, 0],
      },
    ],

    styles: {
      th: {
        bold: true,
        color: COLORS.headerText,
        fontSize: FONT_SIZES.small,
        margin: [4, 5],
        fillColor: COLORS.primary,
      },
    },

    defaultStyle: {
      font: "Roboto",
      fontSize: FONT_SIZES.body,
      color: COLORS.bodyText,
    },
  };

  const safeTerm = (student.term || "result").replace(/\s+/g, "_");
  pdfMake
    .createPdf(docDefinition)
    .download(`result_${student.id}_${safeTerm}.pdf`);
};
