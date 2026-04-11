import React from "react";

const Error1 = () => {
  return (
    <div
      style={{
        padding: "16px 24px",
        backgroundColor: "#fef2f2", // Light red background
        color: "#b91c1c", // Dark red text
        border: "1px solid #f87171", // Soft red border
        borderRadius: "8px",
        textAlign: "center",
        maxWidth: "500px",
        margin: "20px auto", // Centers the box horizontally
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: "500",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      Sorry we could not process your request at the moment, please try again
      later.
    </div>
  );
};

export default Error1;
