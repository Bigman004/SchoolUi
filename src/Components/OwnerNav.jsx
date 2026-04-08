import React, { useEffect, useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

const OwnerNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // async function getTeacherDetails() {
    //   const response = await getTeacher();
    //   setTeacher(response);
    // }
    // getTeacherDetails();
  }, []);

  return (
    <nav className="main-navbar">
      {/* Logo circle */}
      <div className="nav-logo">🎓</div>

      {/* Nav links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/owner_page" onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/add_teacher" onClick={() => setMenuOpen(false)}>
          Add teacher
        </NavLink>
        <NavLink to="/check_payment" onClick={() => setMenuOpen(false)}>
          check payment
        </NavLink>
        <NavLink to="/create_bill" onClick={() => setMenuOpen(false)}>
          create bill
        </NavLink>

        <NavLink to={`/change-password`} onClick={() => setMenuOpen(false)}>
          Password
        </NavLink>
      </div>

      {/* Welcome pill */}
      <div className="welcome-text">Welcome, Teacher</div>

      {/* Hamburger */}
      <button
        className="open-sidebar-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#1a1a1a"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#1a1a1a"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default OwnerNav;
