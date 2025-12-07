import React, { useState, useEffect } from "react";
import "@phosphor-icons/web/regular";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import LandingSection from "./components/LandingSection";
import Dashboard from "./components/Dashboard";
import AuthModal from "./components/AuthModal";
import ProfileModal from "./components/ProfileModal";
import ToastContainer from "./components/ToastContainer";

// Images
const bookLogo = "src\\assets\\book.png";

function App() {
  // --- STATE MANAGEMENT ---
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [activeView, setActiveView] = useState("map");

  // Auth & Profile Modals
  const [authMode, setAuthMode] = useState("login");
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // --- EFFECTS ---
  useEffect(() => {
    if (isDashboardOpen) {
      document.body.classList.add("dashboard-open");
    } else {
      document.body.classList.remove("dashboard-open");
    }
  }, [isDashboardOpen]);

  // --- HANDLERS ---
  const handleToast = (title, message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <>
      <section id="landing-view">
        <Navbar
          logo={bookLogo}
          setAuthMode={setAuthMode}
          setAuthModalOpen={setAuthModalOpen}
          isProfileDropdownOpen={isProfileDropdownOpen}
          setProfileDropdownOpen={setProfileDropdownOpen}
          setProfileModalOpen={setProfileModalOpen}
        />

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setAuthModalOpen(false)}
          authMode={authMode}
          setAuthMode={setAuthMode}
          logo={bookLogo}
          handleToast={handleToast}
        />

        <LandingSection setDashboardOpen={setDashboardOpen} />
      </section>

      <Dashboard
        isDashboardOpen={isDashboardOpen}
        setDashboardOpen={setDashboardOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        handleToast={handleToast}
      />

      <ToastContainer toasts={toasts} />
    </>
  );
}

export default App;