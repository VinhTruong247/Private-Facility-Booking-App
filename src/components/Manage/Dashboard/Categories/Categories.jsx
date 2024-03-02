import React, { useState } from 'react';
import "./Categories.scss";

export default function Categories() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleConfirm = () => {
    // Handle form submission or other actions here
    togglePopup();
  };

  const handleCancel = () => {
    togglePopup();
  };

  return (
    <div className="category-section">
      <h2>Categories</h2>
      <div>Football</div>
      <div>Tennis</div>
      <div>Badminton</div>
      <div>Basketball</div>
      <div>Volleyball</div>
      <div className="add-button" onClick={togglePopup}>+</div>
      {showPopup && (
        <div className="modal">
          <div className="popup-box">
            <h2>Add Category</h2>
            <form>
              <input type="text" placeholder="Category Name" />
              <div className="button-container">
                <button className="confirm-button" type="button" onClick={handleConfirm}>Confirm</button>
                <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
