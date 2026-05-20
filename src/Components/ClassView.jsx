import React, { useEffect, useState } from "react";
import { getClassData } from "../Service/OwnerService";
import { useParams } from "react-router-dom";
import { listStudent2 } from "../Service/Service";
import "./ClassView.css";

const ClassView = () => {
  const [pageData, setPageData] = useState(null);
  const { className } = useParams();

  useEffect(() => {
    async function fetchData(className) {
      try {
        const response = await getClassData(className);
        console.log(response);
        setPageData(response);
        console.log(pageData);
      } catch (err) {
        console.error("Failed to load class data:", err);
      }
    }
    fetchData(className);
  }, []);

  return (
    <>
      <div className="class-view-page">
        {pageData ? (
          <div className="class-header">{pageData?.className}</div>
        ) : (
          <div className="class-header-skeleton"></div>
        )}
        <div className="class-view-details">
          <div className="teacher-details">
            <span>
              Teacher:{" "}
              <div className="value">
                {pageData?.teacher.name || "Loading..."}
              </div>
            </span>
            <span>
              Email:{" "}
              <div className="value">
                {pageData?.teacher.teacherEmail || "Loading..."}
              </div>
            </span>
          </div>
          <div className="class-details">
            <span className="s1">
              Number of students:{" "}
              <div className="value">
                {pageData?.students?.length || "Loading..."}
              </div>
            </span>
            <span className="s2">
              Average attendance:{" "}
              <div className="value">
                {pageData?.averageAttendance ?? "Loading..."}
              </div>
              %
            </span>
            <span className="s3">
              Average grade:{" "}
              <div className="value">
                {pageData?.averageGrade ?? "Loading..."}
              </div>
              %
            </span>
            <span className="s4">
              Top student:{" "}
              <div className="value">
                {pageData?.topStudentName || "Loading..."}
              </div>
            </span>
          </div>
        </div>
        <div className="class-view-list-header">
          <div className="student-name">Student Name</div>
          <div className="state-of-origin">State of Origin</div>
          <div className="parent-phone">Parent Phone</div>
          <div className="class-view-header-right">add student</div>
        </div>

        <div className="class-view-list">
          {pageData?.students?.map((student) => (
            <div className="class-view-list-item" key={student.id}>
              <div className="student-name">
                {student.firstName} {student.lastName}
              </div>
              <div className="state-of-origin">{student.stateOfOrigin}</div>
              <div className="parent-phone">{student.parentPhone}</div>
              <div className="action">delete</div>
              <div className="edit">edit</div>
            </div>
          )) || (
            <div className="class-view-list-skeleton">Loading students...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassView;
