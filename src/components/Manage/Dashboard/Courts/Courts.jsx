import React, { useState } from 'react';
import "./Courts.scss";

export default function Courts() {
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

  // Sample data for demonstration
  const categories = [
    {
      name: "Football",
      courts: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5"]
    },
    {
      name: "Tennis",
      courts: ["Court A", "Court B", "Court C", "Court D", "Court E"]
    },
    {
      name: "Badminton",
      courts: ["Court X", "Court Y", "Court Z", "Court W", "Court V"]
    },
    {
      name: "Basketball",
      courts: ["Court Alpha", "Court Beta", "Court Gamma", "Court Delta", "Court Epsilon"]
    },
    {
      name: "Volleyball",
      courts: ["Court I", "Court II", "Court III", "Court IV", "Court V"]
    }
  ];

  return (
    <div className="courts-section">
      <div className="label-container">
        <h2>Courts</h2>
      </div>
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.name} className="sport-box">
            <h4>{category.name}</h4>
            {category.courts.map(court => (
              <div key={court} className="court">{court}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="add-button" onClick={togglePopup}>+</div>
      {showPopup && (
        <div className="modal">
          <div className="popup-box">
            <h2>Add Courts</h2>
            <form>
              <input type="text" placeholder="Courts Name" />
              <input type="text" placeholder="Courts Categories" />
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
