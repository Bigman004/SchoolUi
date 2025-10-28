import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="main-navbar">
      <div className="nav-left">
        <h2 className="nav-logo">Teacher Dashboard</h2>
      </div>

      {/* Nav links */}
      <input type="checkbox" id="sidebar-active" />
      <div className="nav-links">
        <label htmlFor="sidebar-active" className="closed-sidebar-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffff"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </label>

        <Link to="/teacher_page">🏠 Dashboard</Link>

        <Link to="/student">👨‍🎓 Students</Link>

        <Link to="/add_student">➕ Add Student</Link>
        <Link to="/result_page">📊 Results</Link>
      </div>
      <div className="welcome-text">Welcome Teacher</div>
      <label htmlFor="sidebar-active" className="open-sidebar-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffff"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </label>
    </nav>
  );
};

export default Nav;
