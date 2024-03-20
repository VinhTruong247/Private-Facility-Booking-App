import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../../services/authService";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
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
import "./Manage.scss"

export default function Manage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSignoutPopup, setShowSignoutPopup] = useState(false);

  const handleSignoutClick = () => {
    setShowSignoutPopup(true);
  };

  const handleCancelSignout = () => {
    setShowSignoutPopup(false);
  };

  const handleLogout = async () => {
    let res = await logoutAPI();
    if (res.succeeded === false) {
      toast.error(res.message);
    } else {
      dispatch(logout());
      navigate("/login");
      setShowSignoutPopup(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopNavbar />
      {showSignoutPopup && (
        <div className="overlay" onClick={handleCancelSignout}>
          <div className="signout-popup" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to sign out?</p>
            <div className="button-container">
              <button className="confirm-button" onClick={handleLogout}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelSignout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", height:"80vh" }}>
        <Sidebar handleSignoutClick={handleSignoutClick} />
        <div className="page-container" style={{width:"100%"}} >
          <div className="content-body">
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
