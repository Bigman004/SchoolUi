import React, { use, useState } from "react";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import user_icon from "../assets/images/teacher-logo.png";
import "./Login.css";
import { postLoginDetails, postLoginDetails2 } from "../Service/Service";
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
              onClick={() => {
                try {
                  async function postData() {
                    const response = await postLoginDetails2(
                      registrationNumber,
                      password
                    );
                    console.log(response);
                    if (response.status === 200) {
                      navigate("/teacher_page");
                      localStorage.setItem("token", response.data);
                    } else setLoginMessage("invalid credentials");
                  }
                  postData();
                } catch (error) {
                  console.error("login failed");
                  alert("invalid username or password");
                }
              }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="login-message">{loginMessage}</div>
      </div>
    </>
  );
};

export default Login;
