import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import { useEffect } from "react";
import { listStudent2 } from "../../Service/Service";
import "./Student.css";

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await listStudent2();
      console.log(response);
      setStudentList(response.list);
    }
    fetchData();
  }, []);

  // ...
  return (
    <>
      <Nav />
      <div className="student-list">
        <div className="page-top">
          <div>
            <h2>Student List</h2>
            <p>All enrolled students</p>
          </div>
          <div className="top-right">
            <span className="student-count">{studentList.length} students</span>
          </div>
        </div>

        <div className="table-card">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Parent phone</th>
                  <th>State</th>
                  <th>LGA</th>
                  <th>Address</th>
                  <th>Date of birth</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="name-cell">
                        <div className="avatar">
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </div>
                        <span className="name-text">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="id-pill">{student.id}</span>
                    </td>
                    <td>
                      <span className="phone-text">{student.parentPhone}</span>
                    </td>
                    <td>
                      <span className="state-badge">
                        {student.stateOfOrigin}
                      </span>
                    </td>
                    <td>
                      <span className="lga-text">{student.lga}</span>
                    </td>
                    <td>
                      <span className="address-text">
                        {student.homeAddress}
                      </span>
                    </td>
                    <td>
                      <span className="dob-text">{student.dateOfBirth}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
