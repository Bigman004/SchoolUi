import { useState, useEffect } from "react";
import { getOwnerResource } from "../Service/OwnerService";
import "./OwnerPage.css";
import OwnerNav from "./OwnerNav";

/* ── Helper: extract initials from a name ── */
const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

/* ── Helper: bar width % capped at 100 ── */
const barWidth = (count, max) =>
  max > 0 ? Math.min(Math.round((count / max) * 100), 100) : 0;

/* ── Today's date label ── */
const todayLabel = () =>
  new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const OwnerPage = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwnerData() {
      try {
        const response = await getOwnerResource();
        setOwnerData(response);
      } catch (err) {
        console.error("Failed to load owner data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOwnerData();
  }, []);

  /* Derived stats */
  const teacherCount = ownerData.length;
  const totalStudents = ownerData.reduce(
    (sum, d) => sum + (d.numberOfStudents ?? 0),
    0,
  );
  const maxStudents = Math.max(
    ...ownerData.map((d) => d.numberOfStudents ?? 0),
    1,
  );

  return (
    <>
      <OwnerNav />

      <div className="owner-page">
        {/* ── Page header ── */}
        <div className="page-header">
          <div className="page-header-text">
            <h1>Welcome back</h1>
            <p>School management overview</p>
          </div>
          <div className="page-header-meta">
            <span className="status-dot" />
            <span>{todayLabel()}</span>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="top-page">
          {/* Teachers */}
          <div className="stat-card">
            <span className="card-icon">👩‍🏫</span>
            <div className="data-item">
              <span className="data-label">Total teachers</span>
              {loading ? (
                <span className="skeleton" style={{ width: 60, height: 40 }} />
              ) : (
                <span className="value">{teacherCount}</span>
              )}
              <span className="value-trend">↑ Active staff</span>
            </div>
          </div>

          {/* Days open */}
          <div className="stat-card">
            <span className="card-icon">📅</span>
            <div className="data-item">
              <span className="data-label">Days school open</span>
              {loading ? (
                <span className="skeleton" style={{ width: 60, height: 40 }} />
              ) : (
                <span className="value">{ownerData[0]?.schoolOpens} days</span>
              )}
              <span className="value-trend">↑ This session</span>
            </div>
          </div>

          {/* Students */}
          <div className="stat-card">
            <span className="card-icon">🎓</span>
            <div className="data-item">
              <span className="data-label">Total students</span>
              {loading ? (
                <span className="skeleton" style={{ width: 60, height: 40 }} />
              ) : (
                <span className="value">{totalStudents}</span>
              )}
              <span className="value-trend">↑ Enrolled</span>
            </div>
          </div>
        </div>

        {/* ── Teacher table ── */}
        <div className="bottom-page">
          <div className="table-header">
            <div className="table-header-left">
              <h2>Teacher Overview</h2>
              <p>All registered teachers and their classes</p>
            </div>
            <span className="table-count">
              {loading
                ? "Loading…"
                : `${teacherCount} teacher${teacherCount !== 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Class</th>
                  <th>Students</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  /* Skeleton rows */
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 5 }).map((__, j) => (
                        <td key={j}>
                          <span
                            className="skeleton"
                            style={{
                              display: "block",
                              height: 16,
                              width:
                                j === 0
                                  ? 140
                                  : j === 1
                                    ? 180
                                    : j === 2
                                      ? 90
                                      : j === 3
                                        ? 60
                                        : 40,
                            }}
                          />
                        </td>
                      ))}
                      <td />
                    </tr>
                  ))
                ) : ownerData.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <div className="empty-state-icon">🏫</div>
                        <h3>No teachers found</h3>
                        <p>Teachers will appear here once they are added.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ownerData.map((data, index) => {
                    const name = data.teacher?.name ?? "—";
                    const email = data.teacher?.teacherEmail ?? "—";
                    const uname = data.teacher?.username ?? "—";
                    const cls = data.teacher?.teacherClass ?? "—";
                    const count = data.numberOfStudents ?? 0;
                    const width = barWidth(count, maxStudents);

                    return (
                      <tr key={index}>
                        {/* Name + avatar */}
                        <td>
                          <div className="name-cell">
                            <span className="avatar">{getInitials(name)}</span>
                            <span className="name-text">{name}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td>{email}</td>

                        {/* Username */}
                        <td>
                          <span className="username-cell">{uname}</span>
                        </td>

                        {/* Class badge */}
                        <td>
                          <span className="badge">{cls}</span>
                        </td>

                        {/* Student count + mini bar */}
                        <td>
                          <div className="student-count">{count}</div>
                          <div
                            className="student-count-bar"
                            style={{ width: `${width}%` }}
                          />
                        </td>

                        {/* Hover action */}
                        <td>
                          <div className="row-actions">
                            <button className="row-action-btn">View</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerPage;
