import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TeacherPage.css";
import Nav from "./Nav";
import { listStudent2, printResult } from "../../Service/Service";
import { generateResult } from "../../Service/PdfTemplate";

/* ── Helper: initials from full name ── */
const getInitials = (first = "", last = "") =>
  `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();

/* ── Helper: bar width % capped at 100 ── */
const barWidth = (index, total) =>
  total > 0 ? Math.min(Math.round(((index + 1) / total) * 100), 100) : 0;

/* ── Today's date label ── */
const todayLabel = () =>
  new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const TeacherPage = () => {
  const [teacher, setTeacher] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listStudent2();
        setTeacher(response.teacher);
        setStudentList(response.list ?? []);
      } catch (err) {
        console.error("Failed to load data:", err);
        navigate("/error_page");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleClick = async (id, term) => {
    const response = await printResult(id + "/" + term);
    console.log(response);
    generateResult(response);
  };

  const studentCount = studentList.length;

  return (
    <>
      <Nav />

      <div className="teacher-page">
        {/* ── Page header ── */}
        <div className="page-header">
          <div className="page-header-text">
            <h1>
              {loading
                ? "Welcome back"
                : `Welcome back, ${teacher?.name?.split(" ")[0] ?? ""}`}
            </h1>
            <p>Class management overview</p>
          </div>
          <div className="page-header-meta">
            <span className="status-dot" />
            <span>{todayLabel()}</span>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="top-page">
          {/* Teacher info card */}
          <div className="stat-card stat-card--wide">
            <div className="teacher-image-wrap">
              {loading ? (
                <span className="skeleton skeleton--circle" />
              ) : (
                <div className="teacher-avatar">
                  {getInitials(
                    teacher?.name?.split(" ")[0],
                    teacher?.name?.split(" ")[1],
                  )}
                </div>
              )}
            </div>
            <div className="data-item">
              <span className="data-label">Class teacher</span>
              {loading ? (
                <span className="skeleton" style={{ width: 140, height: 28 }} />
              ) : (
                <span className="value value--name">
                  {teacher?.name ?? "—"}
                </span>
              )}
              {loading ? (
                <span
                  className="skeleton"
                  style={{ width: 180, height: 14, marginTop: 6 }}
                />
              ) : (
                <span className="value-sub">{teacher?.email ?? "—"}</span>
              )}
            </div>
          </div>

          {/* Class card */}
          <div className="stat-card">
            <span className="card-icon">🏫</span>
            <div className="data-item">
              <span className="data-label">Assigned class</span>
              {loading ? (
                <span className="skeleton" style={{ width: 70, height: 40 }} />
              ) : (
                <span className="value">{teacher?.teacherClass ?? "—"}</span>
              )}
              <span className="value-trend">↑ Current session</span>
            </div>
          </div>

          {/* Students card */}
          <div className="stat-card">
            <span className="card-icon">🎓</span>
            <div className="data-item">
              <span className="data-label">Total students</span>
              {loading ? (
                <span className="skeleton" style={{ width: 60, height: 40 }} />
              ) : (
                <span className="value">{studentCount}</span>
              )}
              <span className="value-trend">↑ Enrolled</span>
            </div>
          </div>
        </div>

        {/* ── Student table ── */}
        <div className="bottom-page">
          <div className="table-header">
            <div className="table-header-left">
              <h2>Student Overview</h2>
              <p>All students in your class</p>
            </div>
            <span className="table-count">
              {loading
                ? "Loading…"
                : `${studentCount} student${studentCount !== 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Parent Phone</th>
                  <th>State of Origin</th>
                  <th>Edit</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  /* Skeleton rows */
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {[30, 160, 100, 110, 110, 70, 80].map((w, j) => (
                        <td key={j}>
                          <span
                            className="skeleton"
                            style={{ display: "block", height: 16, width: w }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : studentList.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">
                        <div className="empty-state-icon">🎒</div>
                        <h3>No students found</h3>
                        <p>Students will appear here once they are enrolled.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  studentList.map((student, index) => (
                    <tr key={student.id}>
                      {/* S/N */}
                      <td className="td-sn">{index + 1}</td>

                      {/* Name + avatar */}
                      <td>
                        <div className="name-cell">
                          <span className="avatar">
                            {getInitials(student.firstName, student.lastName)}
                          </span>
                          <span className="name-text">
                            {student.firstName} {student.lastName}
                          </span>
                        </div>
                      </td>

                      {/* Student ID */}
                      <td>
                        <span className="username-cell">
                          {student.regNumber}
                        </span>
                      </td>

                      {/* Parent phone */}
                      <td>{student.parentPhone}</td>

                      {/* State of origin */}
                      <td>
                        <span className="badge">{student.stateOfOrigin}</span>
                      </td>

                      {/* Edit profile */}
                      <td>
                        <div className="edit-btn">
                          <Link
                            to={`/edit/${student.id}`}
                            className="row-action-btn"
                          >
                            ✏️ Edit
                          </Link>
                        </div>
                      </td>

                      {/* Print result dropdown */}
                      <td>
                        <div className="print-result-btn">
                          Result
                          <div className="term-action">
                            <div
                              className="first-term"
                              onClick={() =>
                                handleClick(student.id, "1st term")
                              }
                            >
                              1st term
                            </div>
                            <div
                              className="second-term"
                              onClick={() =>
                                handleClick(student.id, "2nd term")
                              }
                            >
                              2nd term
                            </div>
                            <div
                              className="third-term"
                              onClick={() =>
                                handleClick(student.id, "3rd term")
                              }
                            >
                              3rd term
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
