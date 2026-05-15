import React, { useState } from "react";
import "./ChangePasswordRequest.css";
import { requestPasswordReset } from "../Service/Service";

const ChangePasswordRequest = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await requestPasswordReset(username);
      setLoading(false);
      if (response.status >= 200 && response.status < 300) {
        setLoading(false);
        setError(false);
        setMessage("Password reset link sent to your email.");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage(
        "Failed to send password reset link. no email was found. with the provided username.",
      );
    }
  };

  return (
    <>
      {loading ? <div className="request-skeleton"></div> : <div></div>}
      <div className="change-password-request">
        <div className="request-body">
          <h2>Enter your username</h2>
          <p> we will send a password reset link to your email </p>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className="action-section">
            <button
              className="submit-button"
              onClick={() => {
                handleClick();
              }}
            >
              Submit
            </button>
            <div className={`message ${error ? "message--error" : ""}`}>
              {message}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordRequest;
