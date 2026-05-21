import React, { useState } from "react";
import "../Teacher/Nav.css";
import { NavLink } from "react-router-dom";

const DeveloperNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [teacher, setTeacher] = useState({});

  return (
    <nav className="main-navbar">
      {/* Logo circle */}
      <div className="nav-logo">🎓</div>

      {/* Nav links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/developer" onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/past_events" onClick={() => setMenuOpen(false)}>
          past events{" "}
        </NavLink>
        <NavLink to="/add_school" onClick={() => setMenuOpen(false)}>
          Add school
        </NavLink>
        <NavLink to="/settings" onClick={() => setMenuOpen(false)}>
          settings
        </NavLink>
        <NavLink to="/Automation" onClick={() => setMenuOpen(false)}>
          Automation
        </NavLink>
        <NavLink
          to={`/change-password/${teacher?.user?.registrationNumber}`}
          onClick={() => setMenuOpen(false)}
        >
          Password
        </NavLink>
      </div>

      {/* Welcome pill */}
      <div className="welcome-text">Welcome, Developer</div>

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

export default DeveloperNav;
