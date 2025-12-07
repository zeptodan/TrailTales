import React, { useState } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";

const Dashboard = ({
  isDashboardOpen,
  setDashboardOpen,
  activeView,
  setActiveView,
  handleToast,
}) => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Alice",
      status: "Pinned a location",
      avatarColor: "#f28b50",
    },
    { id: 2, name: "Bob", status: "Online", avatarColor: "#384959" },
  ]);
  const [chatTitle, setChatTitle] = useState("Group Chat: Spain Trip");

  const switchView = (viewName) => {
    setActiveView(viewName);
  };

  const openChatWith = (friendName) => {
    setChatTitle("Chat with " + friendName);
    switchView("chat");
  };

  return (
    <section id="dashboard-view" className={isDashboardOpen ? "active" : ""}>
      <button className="back-home-btn" onClick={() => setDashboardOpen(false)}>
        <i className="ph ph-arrow-down"></i> Back
      </button>

      {/* Desktop Nav Rail */}
      <div className="desktop-nav-rail">
        {["map", "friends", "chat", "profile"].map((view) => (
          <button
            key={view}
            className={`desk-nav-item ${activeView === view ? "active" : ""}`}
            onClick={() => switchView(view)}
            data-tooltip={view.charAt(0).toUpperCase() + view.slice(1)}
          >
            <i
              className={`ph ${
                view === "map"
                  ? "ph-map-trifold"
                  : view === "friends"
                  ? "ph-users"
                  : view === "chat"
                  ? "ph-chat-circle-text"
                  : "ph-user"
              }`}
            ></i>
          </button>
        ))}
      </div>

      <MapComponent />

      <Sidebar
        activeView={activeView}
        friends={friends}
        setFriends={setFriends}
        chatTitle={chatTitle}
        openChatWith={openChatWith}
        handleToast={handleToast}
      />

      <nav className="mobile-nav">
        {["map", "friends", "chat", "profile"].map((view) => (
          <button
            key={view}
            className={`nav-item ${activeView === view ? "active" : ""}`}
            onClick={() => switchView(view)}
          >
            <i
              className={`ph ${
                view === "map"
                  ? "ph-map-trifold"
                  : view === "friends"
                  ? "ph-users"
                  : view === "chat"
                  ? "ph-chat-circle-text"
                  : "ph-user"
              }`}
            ></i>
            <span>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
          </button>
        ))}
      </nav>
    </section>
  );
};

export default Dashboard;
