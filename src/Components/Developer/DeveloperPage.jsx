import React, { useState, useEffect } from "react";
import {
  getDeveloperResource,
  getDeveloperResourceByPage,
} from "../../Service/DeveloperService";
import { useNavigate } from "react-router-dom";
import "./DeveloperPage.css";

const DeveloperPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [developerData, setDeveloperData] = useState(null);
  const [logData, setLogData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const searchByList = ["username", "method", "status", "uri"];
  const [searchBy, setSearchBy] = useState("");
  // you are going to add search params and navbar
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    try {
      async function fetchData() {
        const response = await getDeveloperResourceByPage(currentPage + 1);
        setLogData(response.content);
      }
      fetchData();
    } catch (err) {
      console.error(
        "Failed to load developer data for page " + (currentPage + 1) + ": ",
        err,
      );
      navigate("/error");
    }
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    try {
      async function fetchData() {
        const response = await getDeveloperResourceByPage(currentPage - 1);
        setLogData(response.content);
      }
      fetchData();
    } catch (err) {
      console.error(
        "Failed to load developer data for page " + (currentPage - 1) + ": ",
        err,
      );
      navigate("/error");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchBy(value);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getDeveloperResource();
        setLoading(false);
        setDeveloperData(response);
        setLogData(response.content);
        console.log(response);
      } catch (err) {
        console.error("Failed to load developer data:", err);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="developer-page">
        <h2>Welcome to monitoring dashboard</h2>

        <div className="dev-info">
          {!loading ? (
            <>
              <span className="dev-date">
                {new Date().toLocaleDateString()}
              </span>
              <span className="app-title">Aspark SchoolApplication</span>
            </>
          ) : (
            <div className="dev-info-skeleton"> </div>
          )}
        </div>
        <div className="app-info">
          {!loading ? (
            <>
              <p>Application Information</p>
              <span className="total-user">
                Total Users: {developerData?.totalUsers || 12}
              </span>
              <span className="total-req">
                {" "}
                Total Requests: {developerData?.totalRequests || 1200}
              </span>
            </>
          ) : (
            <div className="app-info-skeleton"> </div>
          )}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="enter uri here..."
            onChange={(e) => {
              // Handle search input change
            }}
          />
          <select
            name="searchBy"
            value={searchBy}
            onChange={handleChange}
            required
          >
            <option value="">...</option>
            {searchByList.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="dev-log">
          {!loading ? (
            <>
              <p>Developer Logs</p>
              <div className="dev-log-table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>event date</th>
                      <th>event time</th>
                      <th>Log Level</th>
                      <th>Message</th>
                      <th>Request Method</th>
                      <th>requestUri</th>
                      <th>Status</th>
                      <th>Cross site</th>
                      <th>ipAddress</th>
                      <th>Authorization present</th>
                      <th>Remote Port</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logData?.map((log, index) => (
                      <tr key={index}>
                        <td> {log.id}</td>
                        <td>{log.eventTime}</td>
                        <td>{log.event}</td>
                        <td>
                          {log.success ? (
                            <div className="dev-sucess">Success</div>
                          ) : (
                            <div className="dev-failed">Failed</div>
                          )}
                        </td>
                        <td>{log.requestBody}</td>
                        <td>{log.requestMethod}</td>
                        <td>{log.requestUri}</td>
                        <td>{log.status}</td>
                        <td>{log.originDomain}</td>
                        <td>{log.remoteIp}</td>
                        <td>{log.authHeader ? "Yes" : "No"}</td>
                        <td>{log.remotePort}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button className="prev-btn" onClick={handlePrevPage}>
                  Previous
                </button>
                <span className="page-number">
                  Page {currentPage} of {developerData?.page.totalPages}
                </span>
                <button className="next-btn" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="dev-log-skeleton"> </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeveloperPage;
