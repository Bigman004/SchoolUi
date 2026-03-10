import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import { useEffect } from "react";
import { listStudent2 } from "../Service/Service";

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
  return (
    <>
      <div>
        <Nav />
        <div className="student-list">
          <h2>Student List</h2>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Parent phone</th>
                <th>state of origin</th>
                <th>Lga</th>
                <th>Home address</th>
                <th>date of birth</th>
              </tr>
            </thead>
            {studentList.map((student, index) => (
              <tbody>
                <tr>
                  <td>{student.id}</td>
                  <td>
                    {student.firstName + ""} {student.lastName}
                  </td>
                  <td>{student.parentPhone}</td>
                  <td>{student.stateOfOrigin}</td>
                  <td>{student.lga}</td>
                  <td>{student.homeAddress}</td>
                  <td>{student.dateOfBirth}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
