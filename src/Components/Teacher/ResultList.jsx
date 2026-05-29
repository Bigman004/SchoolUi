import React, { useState, useEffect } from "react";
import { listResult } from "../../Service/Service";
import { useNavigate } from "react-router-dom";
import "./ResultList.css";
import Nav from "./Nav";
import "./ResultList.css";
const ResultList = () => {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const terms = ["1st term", "2nd term", "3rd term"];
  const types = ["test", "exam"];
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [displayTerm, setDisplayTerm] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await listResult(selectedTerm, selectedType);
      setResults(response);
      setDisplayTerm(selectedTerm);
      setDisplayType(selectedType);
    } catch (error) {
      alert("Error occurred while navigating to result.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="result-list-controller">
        <div className="select-term">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Select the term</option>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
        <div className="select-type">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select the type</option>
            {types.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
        <button className="show-results-btn" onClick={handleClick}>
          show results
        </button>
      </div>
      {loading ? (
        <div className="result-list-skeleton"></div>
      ) : (
        results && (
          <div className="result-table">
            <div className="result-table-header">
              results for {displayTerm}:
            </div>
            <table>
              <thead>
                <tr>
                  <th> s/n</th>
                  <th>student name</th>
                  {results?.tableHeader.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* object keys is the first name, last name and the student
                registration number */}
                {Object.keys(results?.tableContent).map((key, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td key={key}>
                      {key.split(" ")[1]} {key.split(" ")[2]}
                    </td>
                    {results?.tableContent[key].map((result, idx) => (
                      <td key={idx}>{result.score || "N/A"}</td>
                    ))}
                    <td>
                      <button
                        className="result-action"
                        onClick={() =>
                          navigate(
                            `/result/${parseInt(key.split(" ")[0])}-${displayTerm}-${displayType}`,
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
          </div>
        )
      )}
    </>
  );
};

export default ResultList;
