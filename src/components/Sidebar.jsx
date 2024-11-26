import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaCalendarAlt, FaComments, FaUser } from "react-icons/fa"; // Example icons from React Icons
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Home button at the top */}
      <NavLink to="/" className="sidebar-link" activeclassname="active">
        <FaHome className="icon" />
      </NavLink>

      {/* Fixed spacer */}
      <div className="fixed-spacer"></div>

      {/* Other icons below */}
      <NavLink to="/groups" className="sidebar-link" activeclassname="active">
        <FaUserFriends className="icon" />
      </NavLink>
      <NavLink to="/events" className="sidebar-link" activeclassname="active">
        <FaCalendarAlt className="icon" />
      </NavLink>
      <NavLink to="/chat" className="sidebar-link" activeclassname="active">
        <FaComments className="icon" />
      </NavLink>
      <NavLink to="/profile" className="sidebar-link" activeclassname="active">
        <FaUser className="icon" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
