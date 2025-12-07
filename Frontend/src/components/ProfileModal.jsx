import React from "react";

const ProfileModal = ({ isOpen, onClose }) => {
  return (
    <div
      id="profile-modal-overlay"
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={(e) => e.target.id === "profile-modal-overlay" && onClose()}
    >
      <div className="profile-modal-window">
        <button className="close-modal-btn" onClick={onClose}>
          <i className="ph ph-x"></i>
        </button>
        <div className="modal-header">
          <div className="avatar large-modal-avatar">JM</div>
          <h2>John Doe</h2>
          <p className="modal-email">john@trailtales.com</p>
          <div className="modal-badges">
            <span className="badge">Traveler</span>
            <span className="badge">Pro Member</span>
          </div>
        </div>
        <div className="modal-stats">
          <div className="stat-box">
            <strong>12</strong>
            <span>Trips</span>
          </div>
          <div className="stat-box">
            <strong>45</strong>
            <span>Pins</span>
          </div>
          <div className="stat-box">
            <strong>8</strong>
            <span>Countries</span>
          </div>
        </div>
        <div className="modal-bio">
          <label>Bio</label>
          <p>
            Digital nomad exploring the world one coffee shop at a time. Currently
            wandering through Europe.
          </p>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfileModal;
