import React, { useState } from "react";

const AuthModal = ({ isOpen, onClose, authMode, setAuthMode, logo, handleToast }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDATION ---
    if (!isValidEmail(username)) {
      handleToast("Validation Error", "Please enter a valid email address.", "error");
      return;
    }
    if (password.length < 6) {
      handleToast("Validation Error", "Password must be at least 6 characters.", "error");
      return;
    }
    if (authMode === "signup") {
      if (fullName.trim().length < 2) {
        handleToast("Validation Error", "Full name is too short.", "error");
        return;
      }
      if (!/^[a-zA-Z\s]*$/.test(fullName)) {
        handleToast("Validation Error", "Name should only contain letters.", "error");
        return;
      }
    }

    const endpoint = authMode === "login" ? "login" : "signup";
    const payload = { username, password };

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        handleToast(
          "Success",
          data.msg || `Successfully ${authMode === "login" ? "logged in" : "signed up"}!`,
          "success"
        );
        onClose();
        setUsername("");
        setPassword("");
        setFullName("");
      } else {
        handleToast("Error", data.msg || "Something went wrong", "error");
      }
    } catch (error) {
      handleToast("Error", "Failed to connect to server", "error");
      console.error(error);
    }
  };

  return (
    <div
      id="auth-modal-overlay"
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={(e) => e.target.id === "auth-modal-overlay" && onClose()}
    >
      <div className="auth-modal-window">
        <button className="close-modal-btn" onClick={onClose}>
          <i className="ph ph-x"></i>
        </button>
        <div className="auth-header">
          <img src={logo} alt="Logo" className="auth-logo" />
          <h2>TrailTales.</h2>
          <p id="auth-subtitle">
            {authMode === "login"
              ? "Welcome back, traveler."
              : "Begin your journey today."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleAuthSubmit}>
          {authMode === "signup" && (
            <div className="input-group">
              <i className="ph ph-user"></i>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <i className="ph ph-envelope-simple"></i>
            <input
              type="email"
              placeholder="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="ph ph-lock-key"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {authMode === "login" && (
            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" /> <span>Remember me</span>
              </label>
              <a href="#" className="forgot-pass">
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit" className="cta-btn full-width">
            {authMode === "login" ? "Log In" : "Create Account"}
          </button>

          <div className="auth-switch">
            <span>
              {authMode === "login"
                ? "New to TrailTales?"
                : "Already have an account?"}
            </span>
            <a
              href="#"
              onClick={() =>
                setAuthMode(authMode === "login" ? "signup" : "login")
              }
            >
              {authMode === "login" ? "Create an account" : "Log In"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
