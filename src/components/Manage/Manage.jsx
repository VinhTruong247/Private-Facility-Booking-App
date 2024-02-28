import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar/TopNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faChartLine,
  faCogs,
  faFileAlt,
  faBuilding,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarCheck as farCalendarCheck,
  faUserCircle as farUserCircle,
  faCalendarAlt as farCalendarAlt,
  faLifeRing as farLifeRing,
} from "@fortawesome/free-regular-svg-icons";
import "./SideBar.scss";

export default function Manage() {
  const [showSignoutPopup, setShowSignoutPopup] = useState(false);
  const [signoutConfirmed, setSignoutConfirmed] = useState(false);

  const handleSignoutClick = () => {
    setShowSignoutPopup(true);
  };

  const handleConfirmSignout = () => {
    // Perform sign out action here
    setSignoutConfirmed(true);
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleCancelSignout = () => {
    setShowSignoutPopup(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopNavbar />
      {showSignoutPopup && (
        <div className="overlay" onClick={handleCancelSignout}>
          <div className="signout-popup" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to sign out?</p>
            <div className="button-container">
              <button className="confirm-button" onClick={handleConfirmSignout}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelSignout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar handleSignoutClick={handleSignoutClick} />
        <div id="page-container" style={{ flex: 1 }}>
          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ handleSignoutClick }) {
  const handleSidebarItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const [activeItem, setActiveItem] = useState("Dashboard");

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
    </div>
  );
}
