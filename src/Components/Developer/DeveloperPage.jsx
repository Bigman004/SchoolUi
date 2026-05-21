import React, { useState, useEffect, use } from "react";
import {
  getDeveloperResource,
  getDeveloperResourceByPage,
  getSearchResult,
} from "../../Service/DeveloperService";
import { useNavigate } from "react-router-dom";
import "./DeveloperPage.css";
import DeveloperNav from "./DeveloperNav";

const DeveloperPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [developerData, setDeveloperData] = useState(null);
  const [logData, setLogData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const searchByList = ["username", "method", "status", "uri"];
  const [searchBy, setSearchBy] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchLevel, setSearchLevel] = useState(false);
  // you are going to add search params and navbar
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    try {
      async function fetchData() {
        if (searchLevel) {
          const response = await getSearchResult(
            searchBy,
            searchParam,
            currentPage + 1,
          );
          setLogData(response.content);
          return;
        }
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
        if (searchLevel) {
          const response = await getSearchResult(
            searchBy,
            searchParam,
            currentPage - 1,
          );
          setLogData(response.content);
          return;
        }
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
    if (name === "searchBy") setSearchBy(value);
    else if (name === "searchParam") setSearchParam(value);
  };
  const handleClick = (e) => {
    if (searchBy === "" || searchParam === "") {
      setErrorMessage("Please select search by and enter search parameter");
      return;
    }

    try {
      async function fetchData() {
        const response = await getSearchResult(
          searchBy,
          searchParam,
          currentPage,
        );
        setLogData(response.content);
        setDeveloperData(response);
        setCurrentPage(response.page.number);
      }
      setSearchLevel(true);
      setLoading(true);
      fetchData();
      setLoading(false);
    } catch (err) {
      console.error("Failed to load search result: ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getDeveloperResource();
        setLoading(false);
        setDeveloperData(response);
        setLogData(response.content);
        setCurrentPage(response.page.number);
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
      <DeveloperNav />
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
                Total Requests: {developerData?.page?.totalElements}
              </span>
            </>
          ) : (
            <div className="app-info-skeleton"> </div>
          )}
        </div>
        <div className="search-bar">
          <div className="search-component">
            <input
              type="text"
              name="searchParam"
              placeholder="enter uri here..."
              onChange={handleChange}
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
            <button onClick={(e) => handleClick(e)}>search</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="dev-log">
          {!loading ? (
            <>
              <p>Developer Logs</p>
              <div className="dev-log-table-scroll">
                {searchLevel && (
                  <div className="search-level">
                    <span>Search By: {searchBy}</span>
                    <span>Search Parameter: {searchParam}</span>
                  </div>
                )}
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>username</th>
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
                        <td>{log.username}</td>
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
                        <td>{log.responseStatus}</td>
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
                <button
                  className="next-btn"
                  onClick={handleNextPage}
                  disabled={currentPage >= developerData?.page.totalPages}
                >
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
