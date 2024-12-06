// Groups.js
import React, { useState } from "react";
import { Users, Search, X } from "lucide-react";
import "./Groups.css";

const Groups = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groups] = useState([
    {
      id: 1,
      name: "CS 326 Team 6",
      description: "Team developing UMass Hangout app",
      members: 6,
      type: "Academic",
      status: "Active now",
      joined: true
    },
    {
      id: 2,
      name: "UMass Book Club",
      description: "Monthly book discussions and reading sessions",
      members: 45,
      type: "Club",
      status: "2 hours ago",
      joined: false
    }
  ]);

  const filters = ["All", "Academic", "Club", "Sports", "Social"];
  
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    type: "Academic",
    maxMembers: "",
    privacy: "public"
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log("Creating new group:", newGroup);
    setShowCreateModal(false);
    setNewGroup({
      name: "",
      description: "",
      type: "Academic",
      maxMembers: "",
      privacy: "public"
    });
  };

  return (
    <div className="groups-container">
      {/* Header */}
      <div className="groups-header">
        <h1>Groups</h1>
        <button 
          className="create-group-btn"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Group
        </button>
      </div>

      {/* Filters */}
      <div className="groups-filters">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="groups-search">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search groups..."
          className="search-input"
        />
      </div>

      {/* Groups List */}
      <div className="groups-list">
        {groups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-info">
              <div className="group-avatar">
                <Users className="group-avatar-icon" />
              </div>
              <div className="group-details">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <div className="group-meta">
                  <span className="group-members">
                    <Users className="meta-icon" />
                    {group.members} members
                  </span>
                  <span className="group-status">{group.status}</span>
                </div>
                <span className="group-type-tag">{group.type}</span>
              </div>
            </div>
            <div className="group-actions">
              <button className={`group-action-btn ${group.joined ? 'joined' : ''}`}>
                {group.joined ? 'Joined' : 'Join'}
              </button>
              <button className="group-action-btn secondary">
                Schedule
              </button>
              <button className="group-action-btn secondary">
                Open Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Group</h2>
              <button 
                className="close-button"
                onClick={() => setShowCreateModal(false)}
              >
                <X className="close-icon" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="create-group-form">
              <div className="form-group">
                <label>Group Name</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  placeholder="Enter group name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  placeholder="Describe your group..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Group Type</label>
                  <select
                    value={newGroup.type}
                    onChange={(e) => setNewGroup({...newGroup, type: e.target.value})}
                  >
                    <option value="Academic">Academic</option>
                    <option value="Club">Club</option>
                    <option value="Sports">Sports</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Maximum Members</label>
                  <input
                    type="number"
                    value={newGroup.maxMembers}
                    onChange={(e) => setNewGroup({...newGroup, maxMembers: e.target.value})}
                    placeholder="Maximum members"
                    min="2"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Privacy Setting</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      checked={newGroup.privacy === "public"}
                      onChange={(e) => setNewGroup({...newGroup, privacy: e.target.value})}
                    />
                    Public
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      checked={newGroup.privacy === "private"}
                      onChange={(e) => setNewGroup({...newGroup, privacy: e.target.value})}
                    />
                    Private
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="create-button">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;