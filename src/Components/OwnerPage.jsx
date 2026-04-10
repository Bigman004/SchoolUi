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
      {/* Replace owner-page::before/after with a real element */}
      <div className="owner-page">
        <div className="page-header">
          <h1>Welcome back</h1>
          <p>School management overview</p>
        </div>

        {/* Split school-data into two separate cards */}
        <div className="top-page">
          <div className="teacherData">
            <div className="data-item">
              <span className="data-label">Total teachers</span>
              <span className="value">{ownerData.length}</span>
            </div>
          </div>
          <div className="school-data">
            <div className="data-item">
              <span className="data-label">Days school open</span>
              <span className="value-sm">
                200<span className="value-suffix">days</span>
              </span>
            </div>
          </div>
          <div className="school-data">
            <div className="data-item">
              <span className="data-label">Total students</span>
              <span className="value">43</span>
            </div>
          </div>
        </div>

        {/* Table with header bar and avatar initials */}
        <div className="bottom-page">
          <div className="table-header">
            <h2>Teacher Overview</h2>
            <span className="table-count">{ownerData.length} teachers</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              ...
              <tbody>
                {ownerData?.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <div className="name-cell">
                        <span className="avatar">
                          {data.teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        {data.teacher.name}
                      </div>
                    </td>
                    ...
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
