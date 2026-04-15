import React, { useState } from "react";
import axios from "axios";
import "./Teacher/AddStudent.css";
import OwnerNav from "./OwnerNav";
import { addTeacher } from "../Service/OwnerService";

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    teacherEmail: "",
    teacherClass: "",
  });

  const [status, setStatus] = useState({ loading: false, message: "" });
  const classList = [
    "primary 1",
    "primary 2",
    "primary 3",
    "primary 4",
    "primary 5",
    "primary 6",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    try {
      const response = await addTeacher(teacher);

      setStatus({ loading: false, message: "✅ Teacher added successfully!" });
      setTeacher({
        name: "",
        teacherEmail: "",
        teacherClass: "",
        dateOfBirth: "",
        lga: "",
        parentPhone: "",
        homeAddress: "",
      });
    } catch (error) {
      setStatus({ loading: false, message: "❌ Failed to add teacher." });
    }
  };

  return (
    <>
      <OwnerNav />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="teacherEmail"
            value={teacher.teacherEmail}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full border p-2 rounded"
          />
          <select
            name="teacherClass"
            value={teacher.teacherClass}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Teacher Class</option>
            {classList.map((studentClass) => (
              <option key={studentClass} value={studentClass}>
                {studentClass}
              </option>
            ))}
          </select>
          {/* <input
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
          /> */}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {status.loading ? "Saving..." : "Add Teacher"}
          </button>
        </form>

        {status.message && (
          <p className="text-center mt-3 font-medium">{status.message}</p>
        )}
      </div>
    </>
  );
};

export default AddTeacher;
