import React from "react";

const DevProcess = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "48px 40px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 500,
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            Coming soon
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            This service is not yet available. We're working on it and will
            notify you when it's ready.
          </p>
        </div>

        {/* Badge */}
        <span
          style={{
            fontSize: "12px",
            padding: "4px 14px",
            borderRadius: "8px",
            backgroundColor: "#fef3c7",
            color: "#92400e",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          In development
        </span>
      </div>
    </div>
  );
};

export default DevProcess;
