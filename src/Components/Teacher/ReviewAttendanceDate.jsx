import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendanceDate } from "../../Service/Service";
import "./ReviewAttendanceDate.css";
import Nav from "./Nav";

const ReviewAttendanceDate = () => {
  const { date } = useParams(); // "12-1-2026"
  const [attendanceList, setAttendanceList] = useState([]);
  const [day, month, year] = date.split("-").map(Number);
  useEffect(() => {
    if (!day || !month || !year) return; // ✅ guard against undefined

    async function getAttendance() {
      const response = await getAttendanceDate({
        day: day,
        month: month,
        year: year,
      });
      setAttendanceList(response.data);
    }

    getAttendance();
  }, []);
  return (
    <>
      <Nav />
      <div className="attendance-Sheet">
        <div className="attendance-table2">
          <table>
            <thead>
              {/* Fix 1: <tr> wraps <th>, not the other way around */}
              <tr>
                <th>Name of Student</th>
                <th>Attendance Status</th>
                <th>Date</th>
              </tr>
            </thead>
            {/* Fix 2: <tbody> wraps the map, not inside it */}
            <tbody>
              {attendanceList.length === 0 && (
                <tr>
                  <td colSpan="3">
                    No attendance records found for this date.
                  </td>
                </tr>
              )}
              {attendanceList.map((attendance, index) => (
                // Fix 3: <tr> wraps <td>s, key goes on the outermost element
                <tr key={index}>
                  {/* Fix 4: Use an expression for string concatenation */}
                  <td>{`${attendance.studentFirstName} ${attendance.studentLastName}`}</td>
                  <td>
                    {attendance.status === true ? (
                      <div className="show-present"></div>
                    ) : (
                      <div className="show-absent"></div>
                    )}
                  </td>
                  <td>{attendance.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReviewAttendanceDate;
