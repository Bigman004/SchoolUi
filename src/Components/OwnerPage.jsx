import { useState, useEffect } from "react";
import { getOwnerResource } from "../Service/OwnerService";
import "./OwnerPage.css";
import OwnerNav from "./OwnerNav";

const OwnerPage = () => {
  const [ownerData, setOwnerData] = useState([]);
  useEffect(() => {
    async function fetchOwnerData() {
      const response = await getOwnerResource();
      setOwnerData(response);
    }
    fetchOwnerData();
  }, []);
  return (
    <>
      <OwnerNav />
      <div className="owner-page">
        <div className="top-page">
          <div className="teacherData">
            <span className="teacher-data-item" data-label="Amount of Teachers">
              <strong>{ownerData.length}</strong>
            </span>
          </div>
          <div className="school-data">
            <span className="school-data-item">
              Amount of time school open:{" 200"}
            </span>
            <span className="school-data-item">
              {" "}
              Total amount of student: 43{" "}
            </span>
          </div>
        </div>
        <div className="bottom-page">
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Teacher Name</th>
                  <th>Teacher Email</th>
                  <th>username</th>
                  <th>Teacher Class</th>
                  <th>No. of student</th>
                </tr>
              </thead>
              <tbody>
                {ownerData?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.teacher.name}</td>
                    <td>{data.teacher.teacherEmail}</td>
                    <td>{data.teacher.username}</td>
                    <td>
                      <span className="badge">{data.teacher.teacherClass}</span>
                    </td>
                    <td>{data.numberOfStudents}</td>
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
export default OwnerPage;
