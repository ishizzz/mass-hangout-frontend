import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaCalendarAlt, FaComments, FaUser } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", icon: FaHome, label: "Home" },
    { path: "/groups", icon: FaUserFriends, label: "Groups" },
    { path: "/events", icon: FaCalendarAlt, label: "Events" },
    { path: "/chat", icon: FaComments, label: "Chat" },
    { path: "/profile", icon: FaUser, label: "Profile" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''} ${index === 0 ? 'home-link' : ''}`
            }
          >
            <item.icon className="icon" />
            <span className="tooltip">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
