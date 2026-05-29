import React from "react";

import { useState, useEffect } from "react";
import "./Result.css";

import Nav from "./Nav";
import { getStudentResult, postResultbyterm } from "../../Service/Service";
import { useParams } from "react-router-dom";

const Result = () => {
  const { info } = useParams();
  const [result, setResult] = useState({});
  const [studentId, term, type] = info.split("-");
  useEffect(() => {
    async function getResult() {
      const response = await getStudentResult(studentId, term, type);
      setResult(response);
    }
    getResult();
  }, []);
  let { id, ...resultData } = result;
  const [status, setStatus] = useState({ loading: false, message: "" });

  const handleChange = (e, termSetter, termData) => {
    setStatus({ ...status, message: "" });
    const { name, value } = e.target;
    if (value === "" || (/^\d+$/.test(value) && value <= 100)) {
      termSetter({ ...termData, [name]: value });
    }
  };

  return (
    <>
      <Nav />
      <div className="upload-result-container">
        <div>
          <span className="result-term">{term}</span>
          <span className="result-type">{type}</span>
        </div>
        <h2>Upload Results for Student ID: {studentId}</h2>

        {/* FIRST TERM FORM */}
        <form
          className="upload-result-form"
          action={() => {
            async function postResult() {
              const response = await postResultbyterm(
                studentId,
                term,
                type,
                result,
              );
              return response;
            }
            setStatus({ loading: true, message: "" });
            postResult();
            setStatus({
              loading: false,
              message: "✅ result upload successfully!",
            });
          }}
        >
          <h3></h3>
          {Object.keys(resultData).map((subject) => (
            <div className="form-group" key={`first-${subject}`}>
              <label htmlFor={`first-${subject}`}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
              <input
                type="number"
                id={`first-${subject}`}
                name={subject}
                value={resultData[subject]}
                onChange={(e) => handleChange(e, setResult, result)}
                placeholder="Enter score (0-100)"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="submit-btn"
            disabled={status.loading}
          >
            Upload {term} {type}
          </button>
          {status.message && (
            <p className="text-center mt-3 font-medium">{status.message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default Result;
