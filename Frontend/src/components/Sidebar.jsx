import React, { useState } from "react";

const Sidebar = ({
  activeView,
  friends,
  setFriends,
  chatTitle,
  openChatWith,
  handleToast,
}) => {
  const [showAddFriendInput, setShowAddFriendInput] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");

  const handleAddFriend = () => {
    const trimmedName = newFriendName.trim();
    if (!trimmedName) return;

    if (trimmedName.length > 15) {
      handleToast("Error", "Name is too long (max 15 chars)", "error");
      return;
    }

    const isDuplicate = friends.some(
      (f) => f.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      handleToast("Error", "This friend is already in your list!", "error");
      return;
    }

    const newFriend = {
      id: crypto.randomUUID(),
      name: trimmedName,
      status: "Just joined",
      avatarColor: "#f28b50",
    };

    setFriends([...friends, newFriend]);
    setNewFriendName("");
    setShowAddFriendInput(false);
    handleToast("Success", "Friend added successfully!", "success");
  };

  return (
    <aside
      className={`sidebar-glass ${
        activeView !== "map" ? "panel-open mobile-visible" : ""
      }`}
      id="mainSidebar"
    >
      {/* Profile Panel */}
      <div
        id="profile-panel"
        className={`panel-section ${
          activeView === "profile" ? "active-section" : ""
        }`}
      >
        <div className="profile-header">
          <div className="avatar large">JM</div>
          <h3>John M.</h3>
          <span className="status">Traveling in Spain</span>
        </div>
        <div className="divider"></div>
        <div className="privacy-control">
          <span>Location Visibility</span>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Friends Panel */}
      <div
        id="friends-panel"
        className={`panel-section ${
          activeView === "friends" ? "active-section" : ""
        }`}
      >
        <div className="panel-header-row">
          <h4>Friends Online</h4>
          <button
            className="add-friend-btn"
            onClick={() => setShowAddFriendInput(!showAddFriendInput)}
            title="Add Friend"
          >
            <i
              className={`ph ${showAddFriendInput ? "ph-minus" : "ph-plus"}`}
            ></i>
          </button>
        </div>

        {showAddFriendInput && (
          <div className="add-friend-form">
            <input
              type="text"
              placeholder="Enter friend's name..."
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddFriend()}
            />
            <button onClick={handleAddFriend}>
              <i className="ph ph-check"></i>
            </button>
          </div>
        )}

        <div className="friends-list-container">
          {friends.length === 0 ? (
            <p className="no-friends-msg">No friends yet. Add one!</p>
          ) : (
            friends.map((friend) => (
              <div key={friend.id} className="friend-item">
                <div className="friend-left">
                  <div
                    className="friend-avatar"
                    style={{ background: friend.avatarColor }}
                  >
                    {friend.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="friend-details">
                    <p>{friend.name}</p>
                    <small>{friend.status}</small>
                  </div>
                </div>

                <button
                  className="msg-icon-btn"
                  onClick={() => openChatWith(friend.name)}
                >
                  <i className="ph ph-chat-circle-dots"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Panel */}
      <div
        id="chat-panel"
        className={`panel-section ${
          activeView === "chat" ? "active-section" : ""
        }`}
      >
        <h4 id="chat-header-title">{chatTitle}</h4>
        <div className="chat-messages" id="chat-box">
          <div className="msg received">
            <p>Check out this view! 📸</p>
          </div>
          <div className="msg sent">
            <p>That looks amazing!</p>
          </div>
        </div>
        <div className="chat-input-area">
          <input type="text" placeholder="Type a message..." />
          <button className="send-btn">
            <i className="ph ph-paper-plane-right"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
