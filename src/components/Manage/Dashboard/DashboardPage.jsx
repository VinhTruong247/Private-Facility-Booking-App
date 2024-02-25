import React, { useState } from "react";
import "./Dashboard.scss";
import Sidebar from "../../../layout/SideBar";

function DashboardPage() {
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
    <div className="dashboard-container">
      <div className="dashboard-page">
        <div className="box box-1">Content for box 1</div>
        <div className="box box-2">Content for box 2</div>
        <div className="box box-3">Content for box 3</div>
        <div className="box box-4">Content for box 4</div>
        <div className="box box-5">Content for box 5</div>
        <div className="box box-6">Content for box 6</div>
        <div className="box box-7">Content for box 7</div>
        <div className="box box-8">Content for box 8</div>
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

export default DashboardPage;
