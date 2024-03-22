import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../../services/authService";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import TopNavbar from "./TopNavbar/TopNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faChartLine, faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt as farCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import "./SideBar.scss";
import "./Manage.scss";

export default function Manage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSignoutPopup, setShowSignoutPopup] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

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

  const handleSidebarItemClick = (itemName) => {
    setActiveItem(itemName);
    if (itemName === "Dashboard") {
      navigate("/manage");
    } else if (itemName === "Executive Summary") {
      navigate("/manage/summary");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopNavbar />
      {showSignoutPopup && (
        <div className="overlay" onClick={handleCancelSignout}>
          <div
            className="signout-popup"
            onClick={(e) => e.stopPropagation()}
          >
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
      <div style={{ display: "flex", height: "80vh" }}>
        <Sidebar
          handleSignoutClick={handleSignoutClick}
          activeItem={activeItem}
          handleSidebarItemClick={handleSidebarItemClick}
        />
        <div className="page-container" style={{ width: "100%" }}>
          <div className="content-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ handleSignoutClick, activeItem, handleSidebarItemClick }) {
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${
          activeItem === "Dashboard" ? "active" : ""
        }`}
        onClick={() => handleSidebarItemClick("Dashboard")}
      >
        <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "Executive Summary" ? "active" : ""
        }`}
        onClick={() => handleSidebarItemClick("Executive Summary")}
      >
        <FontAwesomeIcon icon={faChartLine} /> Executive Summary
      </div>
      <div className="line"></div>
      <div
        className={`sidebar-item`}
        onClick={() => (window.location.href = "/")}
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "Sign Out" ? "active" : ""
        }`}
        onClick={handleSignoutClick}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
      </div>
    </div>
  );
}
