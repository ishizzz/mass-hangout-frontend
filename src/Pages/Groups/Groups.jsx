import React, { useState } from "react";
import { Users, Search, X, Clock, MapPin } from "lucide-react";
import "./Groups.css";

const Groups = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "CS 326 Team 6",
      time: "3:00 PM - 5:00 PM",
      place: "CS Building Room 142",
      date: "2024-12-10",
      joined: true,
    },
    {
      id: 2,
      name: "UMass Book Club",
      time: "2:00 PM - 4:00 PM",
      place: "Library Floor 2",
      date: "2024-12-11",
      joined: false,
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    time: "",
    place: "",
    date: "", // Add event date to the state
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log("Creating new group:", newGroup);
    setGroups((prevGroups) => [
      ...prevGroups,
      { ...newGroup, id: prevGroups.length + 1, joined: true },
    ]);
    setShowCreateModal(false);
    setNewGroup({
      name: "",
      description: "",
      time: "",
      place: "",
      date: "",
    });
  };

  const toggleJoin = (id) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, joined: !group.joined } : group
      )
    );
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

      {/* Search */}
      <div className="groups-search">
        <Search className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search groups..."
          className="search-input"
        />
      </div>

      {/* Groups List */}
      <div className="groups-list">
        {groups
          .filter((group) =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-info">
                <div className="group-avatar">
                  <Users className="group-avatar-icon" />
                </div>
                <div className="group-details">
                  <h3>{group.name}</h3>
                  <div className="group-meta">
                    <span className="group-time">
                      <Clock className="meta-icon" />
                      {group.time}
                    </span>
                    <span className="group-place">
                      <MapPin className="meta-icon" />
                      {group.place}
                    </span>
                    <span className="group-date">
                      <Clock className="meta-icon" />
                      {group.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="group-actions">
                <button
                  className={`group-action-btn ${group.joined ? "joined" : ""}`}
                  onClick={() => toggleJoin(group.id)}
                >
                  {group.joined ? "Joined" : "Join"}
                </button>
                <button className="group-action-btn invite">
                  Download Invite
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
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  placeholder="Enter group name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    value={newGroup.time}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, time: e.target.value })
                    }
                    placeholder="e.g., 3:00 PM - 5:00 PM"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Place</label>
                  <input
                    type="text"
                    value={newGroup.place}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, place: e.target.value })
                    }
                    placeholder="Enter location"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newGroup.date}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, date: e.target.value })
                    }
                    required
                  />
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