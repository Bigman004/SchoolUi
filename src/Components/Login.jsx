import React, { use, useState } from "react";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import user_icon from "../assets/images/teacher-logo.png";
import "./Login.css";
import { postLoginDetails2 } from "../Service/Service";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {loading && <div className="login-skeleton"></div>}
      <div className="login-page">
        <div className="login-form">
          <h2>Welcome back</h2>
          <p>Sign in to your account</p>
          <div className="email-input input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              className="email-address"
              id="email-address"
              placeholder="Reg no."
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
            />
          </div>
          <div className="password-input input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="action-section">
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  setLoginMessage("Logging in...");
                  const response = await postLoginDetails2(
                    registrationNumber,
                    password,
                  );
                  console.log("FULL RESPONSE:", response);
                  // This will show:
                  // {data: ..., status: 200, headers: ..., config: ...}

                  if (response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    if (response.data.message === "TEACHER")
                      navigate("/teacher_page");
                    else if (response.data.message === "ADMIN") {
                      navigate("/owner_page");
                    }
                  } else {
                    setLoginMessage("invalid credentials");
                  }
                } catch (error) {
                  setLoginMessage("invalid credentials");
                  setLoading(false);
                }
                setLoading(false);
              }}
            >
              Login
            </button>
          </div>
          <button
            className="forgot-password"
            onClick={() => navigate("/change-password-request")}
          >
            Forgot Password?
          </button>
          <div
            className={`login-message ${loginMessage === "Logging in..." ? "login-message--success" : ""}`}
          >
            {loginMessage}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
