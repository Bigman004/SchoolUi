import React, { useState } from "react";
import DeveloperNav from "./DeveloperNav";
import { addSchool } from "../../Service/DeveloperService";
import "./AddSchool.css";

const AddSchool = () => {
  const [school, setSchool] = useState({ schoolName: "", schoolAddress: "" });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addSchool(school);
      if ((response.status >= 200) & (response.status < 300))
        setGeneratedUsername(response.data);
      else throw new Error("can not process request");

      console.log(response);
    } catch {
      setError({ error: true, message: "could not add school" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DeveloperNav />
      {loading ? <div className="add-school-skeleton"></div> : ""}
      <div className="add-school-page">
        <h1>Add School</h1>
        <p>This is the Add School page. You can add new schools here.</p>
        <form className="add-school-form">
          <div className="form-group">
            <label htmlFor="school-name">School Name:</label>
            <input
              name="schoolName"
              type="text"
              id="school-name"
              placeholder="Enter school name"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setSchool((prev) => ({ ...prev, schoolName: e.target.value }));
                setError({ isError: false, message: "" });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="school-address">School Address:</label>
            <input
              name="schoolAddress"
              type="text"
              id="school-address"
              placeholder="Enter school address"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setSchool((prev) => ({
                  ...prev,
                  schoolAddress: e.target.value,
                }));
                setError({ isError: false, message: "" });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Enter school address"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setSchool((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
                setError({ isError: false, message: "" });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setSchool((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
                setError({ isError: false, message: "" });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">email:</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="your@example.com"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setSchool((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
                setError({ isError: false, message: "" });
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Add School
          </button>
          <div className="add-school-message">
            {error.isError ? (
              <p>{error.message}</p>
            ) : (
              <p>
                {generatedUsername &&
                  `${generatedUsername} is created successfully with default password`}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSchool;
