import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TeacherPage.css";
import teacherLogo from "../assets/images/teacher-logo.png";
import Nav from "./Nav";
import { listStudent2 } from "../Service/Service";
export const TeacherPage = () => {
  const [teacher, setTeacher] = useState({});
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await listStudent2();
      console.log(response);
      setTeacher(response.teacher);
      setStudentList(response.list);
    }
    fetchData();
  }, []);
  return (
    <>
      <Nav />
      <div className="teacher-page">
        <div className="teacher-container">
          <div className="teacher-info">
            <img
              src={teacherLogo}
              alt="teachers-logo"
              className="teacher-image"
            />
            <div className="teacher-info-content">
              <div className="text">name: {teacher.name}</div>
              <div className="text">email: Teachers email</div>
              <div className="text">class: class of teacher</div>
            </div>
          </div>
          <div className="student-list">
            <h2>Student List</h2>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Parent phone</th>
                  <th>state of origin</th>
                  <th>edit profile</th>
                  <th>upload result</th>
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
                    <td>
                      <Link to={`/edit/${student.id}`}>✏️ Edit profile</Link>
                    </td>
                    <td>
                      <Link to={`/result/${student.id}`}>result</Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default TeacherPage;
