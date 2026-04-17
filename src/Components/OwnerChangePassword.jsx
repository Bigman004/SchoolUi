import React, { useState } from "react";
import { useParams } from "react-router-dom";
import password_icon from "../../assets/images/password.png";
import { changeUserPassword } from "../Service/Service";
import "./ChangePassword.css";
import OwnerNav from "./OwnerNav";
const OwnerChangePassword = () => {
  const { teacherRegNo } = useParams();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchStatus, setMatchStatus] = useState({
    matched: false,
    message: "",
  });
  return (
    <>
      <OwnerNav />
      <div className="change-password">
        <form
          action={() => {
            async function changePassword() {
              const response = await changeUserPassword(
                {
                  registrationNumber: null,
                  password: password,
                },
                newPassword,
              );
              if (response.status === 200) {
                alert("password changed successfully");
              } else {
                alert("password change failed");
              }
              return response;
            }
            const response = changePassword();
            setConfirmPassword("");
            setNewPassword("");
            setPassword("");
            setMatchStatus({ matched: false, message: "" });
          }}
        >
          <div className="password input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              className="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="password-input input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="newPassword"
              id="new-password"
              placeholder="new password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="password-input input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (newPassword === event.target.value) {
                  setMatchStatus({
                    matched: true,
                    message: "✅ passwords match",
                  });
                } else {
                  setMatchStatus({
                    matched: false,
                    message: "❌ passwords do not match",
                  });
                }
              }}
            />
          </div>
          {matchStatus.message && (
            <div className="message">{matchStatus.message}</div>
          )}
          <button type="submit">change password</button>
        </form>
      </div>
    </>
  );
};

export default OwnerChangePassword;
