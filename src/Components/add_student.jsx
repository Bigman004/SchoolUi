import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";
import Nav from "./Nav";

export default function AddStudent() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    stateOfOrigin: "",
    dateOfBirth: "",
    lga: "",
    parentPhone: "",
    homeAddress: "",
  });

  const [status, setStatus] = useState({ loading: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    try {
      const response = await axios.post(
        "https://java-application-latest-ywhd.onrender.com/teacher/add_student",
        student,
        {
          withCredentials: true,
        }
      );

      setStatus({ loading: false, message: "✅ Student added successfully!" });
      setStudent({
        firstName: "",
        lastName: "",
        stateOfOrigin: "",
        dateOfBirth: "",
        lga: "",
        parentPhone: "",
        homeAddress: "",
      });
    } catch (error) {
      setStatus({ loading: false, message: "❌ Failed to add student." });
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Student</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="stateOfOrigin"
            value={student.stateOfOrigin}
            onChange={handleChange}
            placeholder="State of Origin"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={student.dateOfBirth}
            onChange={handleChange}
            placeholder="date of birth"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="lga"
            value={student.lga}
            onChange={handleChange}
            placeholder="LGA"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="parentPhone"
            value={student.parentPhone}
            onChange={handleChange}
            placeholder="Parent Phone Number"
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="homeAddress"
            value={student.homeAddress}
            onChange={handleChange}
            placeholder="Home Address"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {status.loading ? "Saving..." : "Add Student"}
          </button>
        </form>

        {status.message && (
          <p className="text-center mt-3 font-medium">{status.message}</p>
        )}
      </div>
    </>
  );
}
