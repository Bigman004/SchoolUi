import React from "react";

import { useState } from "react";
import "./Result.css";

import Nav from "./Nav";
import { postResultbyterm } from "../Service/Service";
import { useParams } from "react-router-dom";

const Result = ({ studentId }) => {
  const { id } = useParams();
  const initialTermData = {
    math: "",
    english: "",
    socialStudies: "",
    basicScience: "",
    crk: "",
    civicEducation: "",
    phe: "",
  };

  const [firstTerm, setFirstTerm] = useState(initialTermData);
  const [secondTerm, setSecondTerm] = useState(initialTermData);
  const [thirdTerm, setThirdTerm] = useState(initialTermData);
  const [status, setStatus] = useState({ loading: false, message: "" });
  const [status2, setStatus2] = useState({ loading: false, message: "" });
  const [status3, setStatus3] = useState({ loading: false, message: "" });

  const handleChange = (e, termSetter, termData) => {
    const { name, value } = e.target;
    if (value === "" || (/^\d+$/.test(value) && value <= 100)) {
      termSetter({ ...termData, [name]: value });
    }
  };

  return (
    <>
      <Nav />
      <div className="upload-result-container">
        <h2>Upload Results for Student ID: {id}</h2>

        {/* FIRST TERM FORM */}
        <form
          className="upload-result-form"
          action={() => {
            async function postResult() {
              const response = await postResultbyterm(
                id,
                "1st term",
                firstTerm
              );
              return response;
            }
            setStatus({ loading: true, message: "" });
            postResult();
            setStatus({
              loading: false,
              message: "✅ result upload successfully!",
            });
            setFirstTerm(initialTermData);
          }}
        >
          <h3>First Term</h3>
          {Object.keys(firstTerm).map((subject) => (
            <div className="form-group" key={`first-${subject}`}>
              <label htmlFor={`first-${subject}`}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
              <input
                type="number"
                id={`first-${subject}`}
                name={subject}
                value={firstTerm[subject]}
                onChange={(e) => handleChange(e, setFirstTerm, firstTerm)}
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
            Upload First Term
          </button>
          {status.message && (
            <p className="text-center mt-3 font-medium">{status.message}</p>
          )}
        </form>

        {/* SECOND TERM FORM */}
        <form
          className="upload-result-form"
          action={() => {
            async function postResult() {
              const response = await postResultbyterm(
                id,
                "2nd term",
                secondTerm
              );
              return response;
            }
            setStatus2({ loading: true, message: "" });
            postResult();
            setStatus2({
              loading: false,
              message: "✅ result upload succcessfully!",
            });
            setSecondTerm(initialTermData);
          }}
        >
          <h3>Second Term</h3>
          {Object.keys(secondTerm).map((subject) => (
            <div className="form-group" key={`second-${subject}`}>
              <label htmlFor={`second-${subject}`}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
              <input
                type="number"
                id={`second-${subject}`}
                name={subject}
                value={secondTerm[subject]}
                onChange={(e) => handleChange(e, setSecondTerm, secondTerm)}
                placeholder="Enter score (0-100)"
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Upload Second Term
          </button>
          {status2.message && (
            <p className="text-center mt-3 font-medium">{status2.message}</p>
          )}
        </form>

        {/* THIRD TERM FORM */}
        <form
          className="upload-result-form"
          action={() => {
            async function postResult() {
              const response = await postResultbyterm(
                id,
                "3rd term",
                thirdTerm
              );
              return response;
            }
            setStatus3({ loading: true, message: "" });
            postResult();
            setStatus3({
              loading: false,
              message: "✅ result upload successfully!",
            });
            setThirdTerm(initialTermData);
          }}
        >
          <h3>Third Term</h3>
          {Object.keys(thirdTerm).map((subject) => (
            <div className="form-group" key={`third-${subject}`}>
              <label htmlFor={`third-${subject}`}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
              <input
                type="number"
                id={`third-${subject}`}
                name={subject}
                value={thirdTerm[subject]}
                onChange={(e) => handleChange(e, setThirdTerm, thirdTerm)}
                placeholder="Enter score (0-100)"
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Upload Third Term
          </button>
          {status3.message && (
            <p className="text-center mt-3 font-medium">{status3.message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default Result;
