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
  const navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <div className="login-form">
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
                try {
                  setLoginMessage("Logging in...");
                  const response = await postLoginDetails2(
                    registrationNumber,
                    password,
                  );
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
                  alert("invalid username or password");
                  setLoginMessage("");
                }
              }}
            >
              Login
            </button>
          </div>
          <div className="login-message"> {loginMessage}</div>
        </div>
      </div>
    </>
  );
};

export default Login;
