import React from "react";
import { listStudent2 } from "../../Service/Service";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import "./Attendance.css";
import { markStudentById } from "../../Service/Service";
import { Link } from "react-router-dom";
const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attended, setAttended] = useState(false);
  useEffect(() => {
    const response = listStudent2();
    response.then((data) => {
      setStudents(data.list);
    });
  }, []);
  console.log(students);
  return (
    <>
      <Nav />
      <div className="attendance-table">
        <div className="attendance-wrapper">
          <div className="attendance-action">
            <h2>Attendance Table</h2>
            <button>
              {" "}
              <Link to="/review_attendance">Review Attendance</Link>
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Parent Phone</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.parentPhone}</td>
                  <td>
                    <button
                      onClick={() => {
                        setAttended(true);
                        const response = markStudentById(student.id, true);
                        response.then((data) => {
                          if (data) {
                            alert("Student marked as present");
                          } else {
                            alert("Failed to mark student as present");
                          }
                        });
                        setAttended(false);
                      }}
                    >
                      Mark Present
                    </button>
                    <button
                      onClick={() => {
                        markStudentById(student.id, false);
                      }}
                    >
                      Mark Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Attendance;
