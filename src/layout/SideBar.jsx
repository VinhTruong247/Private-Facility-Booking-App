import React, { useState } from "react";
import "./SideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendarAlt,
  faChartLine,
  faCogs,
  faFileAlt,
  faCalendarCheck,
  faBuilding,
  faLifeRing,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarCheck as farCalendarCheck,
  faUserCircle as farUserCircle,
  faCalendarAlt as farCalendarAlt,
  faLifeRing as farLifeRing,
} from "@fortawesome/free-regular-svg-icons";

function Sidebar() {
  // State to track the active item
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [showSignoutPopup, setShowSignoutPopup] = useState(false);

  // Function to handle click on sidebar item
  const handleSidebarItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  // Function to handle sign out button click
  const handleSignoutClick = () => {
    setShowSignoutPopup(true);
  };

  // Function to handle confirmation of sign out
  const handleConfirmSignout = () => {
    // Perform sign out action here, such as redirecting to login page
    window.location.href = "/login";
  };

  // Function to handle cancel sign out
  const handleCancelSignout = () => {
    setShowSignoutPopup(false);
  };

  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${activeItem === "Dashboard" ? "active" : ""}`}
        onClick={() => handleSidebarItemClick("Dashboard")}
      >
        <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
      </div>
      <div
        className={`sidebar-item ${activeItem === "Calendar" ? "active" : ""}`}
        onClick={() => handleSidebarItemClick("Calendar")}
      >
        <FontAwesomeIcon icon={farCalendarAlt} /> Calendar
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "Executive Summary" ? "active" : ""
        }`}
        onClick={() => handleSidebarItemClick("Executive Summary")}
      >
        <FontAwesomeIcon icon={faChartLine} /> Executive Summary
      </div>
      <div
        className={`sidebar-item ${activeItem === "Setup" ? "active" : ""}`}
        onClick={() => handleSidebarItemClick("Setup")}
      >
        <FontAwesomeIcon icon={faCogs} /> Setup
      </div>
      <div
        className={`sidebar-item ${activeItem === "Reports" ? "active" : ""}`}
        onClick={() => handleSidebarItemClick("Reports")}
      >
        <FontAwesomeIcon icon={faFileAlt} /> Reports
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "Reservations" ? "active" : ""
        }`}
        onClick={() => handleSidebarItemClick("Reservations")}
      >
        <FontAwesomeIcon icon={farCalendarCheck} /> Reservations
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "Facilitron Works" ? "active" : ""
        }`}
        onClick={() => handleSidebarItemClick("Facilitron Works")}
      >
        <FontAwesomeIcon icon={faBuilding} /> Facilitron Works
      </div>
      <div
        className={`sidebar-item ${activeItem === "Support" ? "active" : ""}`}
        onClick={() => handleSidebarItemClick("Support")}
      >
        <FontAwesomeIcon icon={farLifeRing} /> Support
      </div>
      <hr />
      <div
        className={`sidebar-item ${
          activeItem === "Other Accounts" ? "active" : ""
        }`}
        onClick={() => handleSidebarItemClick("Other Accounts")}
      >
        <FontAwesomeIcon icon={farUserCircle} /> Other Accounts
      </div>
      <div className="line"></div>
      <div
        className={`sidebar-item ${activeItem === "Sign Out" ? "active" : ""}`}
        onClick={handleSignoutClick}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
      </div>
      {showSignoutPopup && (
        <div className="overlay">
          <div className="signout-popup">
            <p>Are you sure you want to sign out?</p>
            <button onClick={handleConfirmSignout}>Yes</button>
            <button onClick={handleCancelSignout}>No</button>
          </div>
        </div>
      )}
    </div>
    
      
  );
}

export default Sidebar;
