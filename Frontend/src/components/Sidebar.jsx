import React, { useState, useEffect } from "react";
import api from "../api/axios";

const Sidebar = ({
  activeView,
  friends,
  setFriends,
  chatTitle,
  openChatWith,
  handleToast,
  user
}) => {
  const [showAddFriendInput, setShowAddFriendInput] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");

  // Fetch friends on mount or user change
  useEffect(() => {
    if (user) {
        const fetchFriends = async () => {
            try {
                const res = await api.get("/friends");
                setFriends(res.data.friends.map(f => ({
                    id: f._id,
                    name: f.username,
                    status: f.bio || "Just joined",
                    avatarColor: f.avatarColor || "#f28b50"
                })));
            } catch (error) {
                console.error("Failed to fetch friends", error);
            }
        };
        fetchFriends();
    } else {
        setFriends([]);
    }
  }, [user, setFriends]);

  const handleAddFriend = async () => {
    const trimmedName = newFriendName.trim();
    if (!trimmedName) return;

    try {
        const res = await api.post("/friends", { friendUsername: trimmedName });
        const newFriend = {
            id: crypto.randomUUID(), // Or use returned ID if available
            name: res.data.friend.username,
            status: res.data.friend.bio || "Just joined",
            avatarColor: res.data.friend.avatarColor || "#f28b50"
        };
        setFriends([...friends, newFriend]);
        setNewFriendName("");
        setShowAddFriendInput(false);
        handleToast("Success", "Friend added successfully!", "success");
    } catch (error) {
        const msg = error.response?.data?.msg || "Failed to add friend";
        handleToast("Error", msg, "error");
    }
  };

  return (
    <aside
      className={`sidebar-glass ${
        ["friends", "chat", "profile"].includes(activeView) ? "panel-open mobile-visible" : ""
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
          <div className="avatar large-modal-avatar" style={{ background: user?.avatarColor || "#f28b50" }}>
            <i className="ph ph-user" style={{ fontSize: "3rem" }}></i>
          </div>
          <h3>{user ? user.username : "Guest User"}</h3>
          <p className="modal-email">{user ? user.email : "guest@trailtales.com"}</p>
          <div className="modal-badges" style={{ justifyContent: "center" }}>
            <span className="badge">Traveler</span>
          </div>
        </div>

        <div className="modal-stats" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div className="stat-box">
            <strong>0</strong>
            <span>Trips</span>
          </div>
          <div className="stat-box">
            <strong>0</strong>
            <span>Pins</span>
          </div>
          <div className="stat-box">
            <strong>0</strong>
            <span>Countries</span>
          </div>
        </div>

        <div className="modal-bio">
          <label>Bio</label>
          <p>
            {user?.bio || "Just a traveler exploring the world one pin at a time."}
          </p>
        </div>

        {/* <button className="edit-profile-btn" style={{ width: "100%", marginTop: "10px" }}>Edit Profile</button> */}

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
            aria-label={showAddFriendInput ? "Cancel adding friend" : "Add a new friend"}
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
              aria-label="Friend's name"
            />
            <button onClick={handleAddFriend} aria-label="Confirm add friend">
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
                    aria-hidden="true"
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
                  aria-label={`Chat with ${friend.name}`}
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
          {/* Messages will appear here */}
        </div>
        <div className="chat-input-area">
          <input 
            type="text" 
            placeholder="Type a message..." 
            aria-label="Type a message"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const msg = e.target.value;
                if (msg.trim()) {
                  const chatBox = document.getElementById('chat-box');
                  const msgDiv = document.createElement('div');
                  msgDiv.className = 'message sent';
                  msgDiv.textContent = msg;
                  msgDiv.style.alignSelf = 'flex-end';
                  msgDiv.style.background = '#f28b50';
                  msgDiv.style.color = 'white';
                  msgDiv.style.padding = '8px 12px';
                  msgDiv.style.borderRadius = '12px';
                  msgDiv.style.marginBottom = '8px';
                  msgDiv.style.maxWidth = '70%';
                  chatBox.appendChild(msgDiv);
                  e.target.value = '';
                  chatBox.scrollTop = chatBox.scrollHeight;
                }
              }
            }}
          />
          <button 
            className="send-btn" 
            aria-label="Send message"
            onClick={() => {
            const input = document.querySelector('.chat-input-area input');
            const msg = input.value;
            if (msg.trim()) {
              const chatBox = document.getElementById('chat-box');
              const msgDiv = document.createElement('div');
              msgDiv.className = 'message sent';
              msgDiv.textContent = msg;
              msgDiv.style.alignSelf = 'flex-end';
              msgDiv.style.background = '#f28b50';
              msgDiv.style.color = 'white';
              msgDiv.style.padding = '8px 12px';
              msgDiv.style.borderRadius = '12px';
              msgDiv.style.marginBottom = '8px';
              msgDiv.style.maxWidth = '70%';
              chatBox.appendChild(msgDiv);
              input.value = '';
              chatBox.scrollTop = chatBox.scrollHeight;
            }
          }}>
            <i className="ph ph-paper-plane-right"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
