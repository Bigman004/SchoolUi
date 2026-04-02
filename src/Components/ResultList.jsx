import React, { useState, useEffect } from "react";
import { listResult } from "../Service/Service";
import { useNavigate } from "react-router-dom";
import "./ResultList.css";
import Nav from "./Nav";
const ResultList = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function returnList() {
      const response = await listResult();
      console.log(response);
      setList(response);
    }
    returnList();
  }, []);
  const handleClick = (info) => {
    navigate(`/result/${info}`);
  };

  console.log(list);
  return (
    <>
      <Nav />
      <div className="result-page">
        {Object.entries(
          list?.reduce((acc, termList) => {
            termList.forEach((result) => {
              const { term, type, studentId } = result;

              if (!acc[term]) acc[term] = {};
              if (!acc[term][type]) acc[term][type] = {};

              if (!acc[term][type][studentId]) {
                acc[term][type][studentId] = { ...result };
              } else {
                Object.keys(result).forEach((key) => {
                  if (result[key] !== null && result[key] !== 0) {
                    acc[term][type][studentId][key] = result[key];
                  }
                });
              }
            });
            return acc;
          }, {}) ?? {},
        ).map(([term, typesMap]) => (
          <div className="termtable" key={term}>
            <details open>
              <summary>{term}</summary>

              {/* Render "test" before "exam" if both exist */}
              {["test", "exam"]
                .filter((type) => typesMap[type])
                .map((type) => (
                  <div className="type-section" key={type}>
                    <details>
                      <summary>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </summary>
                      <table>
                        <thead>
                          <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Math</th>
                            <th>English</th>
                            <th>Basic Science</th>
                            <th>Social Studies</th>
                            <th>CRK</th>
                            <th>PHE</th>
                            <th>Result action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(typesMap[type]).map((result, idx) => (
                            <tr key={idx}>
                              <td data-label="Student ID">
                                {result.studentId}
                              </td>
                              <td data-label="Name">
                                {result.firstName + " " + result.lastName}
                              </td>
                              <td data-label="Math">{result.math}</td>
                              <td data-label="English">{result.english}</td>
                              <td data-label="Basic Science">
                                {result.basicScience}
                              </td>
                              <td data-label="Social Studies">
                                {result.socialStudies}
                              </td>
                              <td data-label="CRK">{result.crk}</td>
                              <td data-label="PHE">{result.phe}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleClick(
                                      result.studentId +
                                        "-" +
                                        term +
                                        "-" +
                                        type,
                                    )
                                  }
                                >
                                  upload result
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  </div>
                ))}
            </details>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultList;
