import React from "react";

const Navbar = ({
  logo,
  setAuthMode,
  setAuthModalOpen,
  isProfileDropdownOpen,
  setProfileDropdownOpen,
  setProfileModalOpen,
}) => {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span>TrailTales.</span>
      </div>

      <div className="nav-links">
        <a
          href="#"
          className="btn-login"
          onClick={() => {
            setAuthMode("login");
            setAuthModalOpen(true);
          }}
        >
          Login
        </a>
        <a
          href="#"
          className="btn-signup"
          onClick={() => {
            setAuthMode("signup");
            setAuthModalOpen(true);
          }}
        >
          Sign Up
        </a>

        <div className="profile-menu-container">
          <button
            className="btn-profile-header"
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            JM
          </button>
          <div
            id="profile-dropdown"
            className={`profile-dropdown ${
              isProfileDropdownOpen ? "active" : ""
            }`}
          >
            <div className="dropdown-info">
              <span className="user-name">John M.</span>
              <span className="user-email">john@trailtales.com</span>
            </div>
            <hr />
            <a
              href="#"
              onClick={() => {
                setProfileDropdownOpen(false);
                setProfileModalOpen(true);
              }}
            >
              <i className="ph ph-user"></i> My Profile
            </a>
            <a href="#">
              <i className="ph ph-gear"></i> Settings
            </a>
            <hr />
            <a href="#" className="logout-link">
              <i className="ph ph-sign-out"></i> Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
