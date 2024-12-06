import React, { useState } from "react";
import { User, Mail, Building, Calendar, Edit2 } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    email: "john@umass.edu",
    department: "Computer Science",
    graduationYear: "2025",
    bio: "CS student interested in web development and AI"
  });

  const [editedData, setEditedData] = useState({...profileData});

  const handleSave = (e) => {
    e.preventDefault();
    setProfileData(editedData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User className="avatar-icon" />
          </div>
          <div className="profile-info">
            <div className="name-section">
              <h2>{profileData.firstName} {profileData.middleName} {profileData.lastName}</h2>
              <button
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="edit-icon" />
              </button>
            </div>
            <p className="profile-subtitle">
              {profileData.department} • Class of {profileData.graduationYear}
            </p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={editedData.firstName}
                  onChange={(e) => setEditedData({...editedData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  value={editedData.middleName}
                  onChange={(e) => setEditedData({...editedData, middleName: e.target.value})}
                  placeholder="Optional"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={editedData.lastName}
                  onChange={(e) => setEditedData({...editedData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={editedData.department}
                  onChange={(e) => setEditedData({...editedData, department: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Graduation Year</label>
                <input
                  type="number"
                  value={editedData.graduationYear}
                  onChange={(e) => setEditedData({...editedData, graduationYear: e.target.value})}
                  min="2024"
                  max="2030"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={editedData.bio}
                onChange={(e) => setEditedData({...editedData, bio: e.target.value})}
                placeholder="Tell us something about yourself"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <Mail className="detail-icon" />
              <span>{profileData.email}</span>
            </div>
            <div className="detail-item">
              <Building className="detail-icon" />
              <span>{profileData.department}</span>
            </div>
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <span>Class of {profileData.graduationYear}</span>
            </div>
            <div className="bio-section">
              <h3>About</h3>
              <p>{profileData.bio}</p>
            </div>
          </div>
        )}
      </div>

      {/* Rest of your profile content (interests, groups, etc.) */}
    </div>
  );
};

export default Profile;