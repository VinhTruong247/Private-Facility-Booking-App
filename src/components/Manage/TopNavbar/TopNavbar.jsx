import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import MenuToggle from "./MenuToggle";
import SearchBar from "./SearchBar";
import NotificationDropdown from "./NotificationDropdown";
import "./TopNavbar.scss";

export default function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className="top-navbar" style={{width:"100%", alignItem: "flex-end",display: "flex",
    flexDirection: "row-reverse" }}>
      <div style={{ display: "flex", alignItems:"center", gap:"1rem" }}>
        <SearchBar />
        <NotificationDropdown
          isOpen={isNotificationOpen}
          toggleNotification={toggleNotification}
        />
      </div>
    </div>
  );
}
