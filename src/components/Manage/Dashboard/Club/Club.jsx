import React, { useState } from "react";
import "./Club.scss";

const Club = () => {
  const [expandedClub, setExpandedClub] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedClub, setEditedClub] = useState(null);
  const [newClub, setNewClub] = useState({
    name: "",
    email: "",
    description: "",
    isActive: true,
    isCommon: false,
    sportType: ""
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
  };

  const handleConfirm = () => {
    // Handle form submission or other actions here
    togglePopup();
  };

  const handleCancel = () => {
    togglePopup();
  };

  const handleEdit = (club) => {
    setEditedClub({
      ...club,
      sportType: club.sportType || "" // Ensure sportType is set, or an empty string if undefined
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (clubId) => {
    // Perform delete action here
    console.log("Deleted Club with ID:", clubId);
  };
  const clubData = [
    {
      id: 1,
      name: "Common",
      email: "common@gmail.com",
      description: "Common club for all users",
      isActive: true,
      isCommon: true
    },
    {
      id: 2,
      name: "Thunder Strikers FC",
      email: "thunderstrikersfc@gmail.com",
      description:
        "A dynamic football club dedicated to promoting teamwork and excellence on the field.",
      isActive: true,
      isCommon: false,
      sportType: "Football"
    },
    {
      id: 3,
      name: "Blaze United",
      email: "blazeunited@gmail.com",
      description:
        "Passionate about football, Blaze United emphasizes skill development and fair play.",
      isActive: true,
      isCommon: false,
      sportType: "Football"
    },
    {
      id: 4,
      name: "Phoenix Kickers",
      email: "phoenixkickers@gmail.com",
      description:
        "Phoenix Kickers is a football club committed to fostering camaraderie and sportsmanship among its members.",
      isActive: true,
      isCommon: false,
      sportType: "Football"
    },
    {
      id: 5,
      name: "Sky Hoopers",
      email: "skyhoopers@gmail.com",
      description:
        "Sky Hoopers is a basketball club that thrives on high-flying dunks, fast breaks, and strategic gameplay.",
      isActive: true,
      isCommon: false,
      sportType: "Basketball"
    },
    {
      id: 6,
      name: "Elite Ballers",
      email: "eliteballers@gmail.com",
      description:
        "Elite Ballers is dedicated to refining basketball skills and promoting a strong sense of unity among its players.",
      isActive: true,
      isCommon: false,
      sportType: "Basketball"
    },
    {
      id: 7,
      name: "Lunar Dunkers",
      email: "lunardunkers@gmail.com",
      description:
        "Lunar Dunkers is a passionate basketball club that aims to reach new heights in both skill and sportsmanship.",
      isActive: true,
      isCommon: false,
      sportType: "Basketball"
    },
    {
      id: 8,
      name: "Swift Shuttlers",
      email: "swiftshuttlers@gmail.com",
      description:
        "Swift Shuttlers is a badminton club focused on agility, precision, and a friendly competitive spirit.",
      isActive: true,
      isCommon: false,
      sportType: "Badminton"
    },
    {
      id: 9,
      name: "Zen Smashers",
      email: "zensmashers@gmail.com",
      description:
        "Precision Racqueteers is committed to honing badminton skills with a focus on accuracy and strategy.",
      isActive: true,
      isCommon: false,
      sportType: "Badminton"
    },
    {
      id: 10,
      name: "Precision Racqueteers",
      email: "precisionracqueteers@gmail.com",
      description:
        "Lunar Dunkers is a passionate basketball club that aims to reach new heights in both skill and sportsmanship.",
      isActive: true,
      isCommon: false,
      sportType: "Badminton"
    }
  ];

  const toggleClubExpansion = (club) => {
    if (expandedClub === club.id) {
      setExpandedClub(null);
    } else {
      setExpandedClub(club.id);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedClub({ ...editedClub, [name]: value });
  };

  return (
    <div className="club-container">
      <div className="label-container">
        <h2>Clubs</h2>
      </div>
      <div className="club-list">
        {clubData.map((club) => (
          <div
            key={club.id}
            className="club"
            onClick={() => toggleClubExpansion(club)}
          >
            <div className="club-name">{club.name}</div>

            {expandedClub === club.id && (
              <div className="club-details">
                <div>
                  <strong>Email:</strong> {club.email}
                </div>
                <div>
                  <strong>Description:</strong> {club.description}
                </div>
                <div>
                  <strong>Sport Type:</strong> {club.sportType || "N/A"}
                </div>
                <div className="club-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(club)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(club.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-button" onClick={togglePopup}>
        +
      </div>
      {showPopup && (
        <div className="modal">
          <div className="popup-box">
            <h2>{editMode ? "Edit Club" : "Add Club"}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="club-name">Name:</label>
                <input
                  type="text"
                  id="club-name"
                  placeholder="Enter Club Name"
                  value={editMode ? editedClub.name : newClub.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="club-email">Email:</label>
                <input
                  type="email"
                  id="club-email"
                  placeholder="Enter Club Email"
                  value={editMode ? editedClub.email : newClub.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="club-description">Description:</label>
                <input
                  type="text"
                  id="club-description"
                  placeholder="Enter Club Description"
                  value={
                    editMode ? editedClub.description : newClub.description
                  }
                  onChange={handleChange}
                  name="description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="club-sport-type">Sport Type:</label>
                <input
                  type="text"
                  id="club-sport-type"
                  placeholder="Enter Sport Type"
                  value={editMode ? editedClub.sportType : newClub.sportType}
                  onChange={handleChange}
                  name="sportType"
                />
              </div>
              <div className="button-container">
                <button
                  className="confirm-button"
                  type="button"
                  onClick={handleConfirm}
                >
                  {editMode ? "Confirm Edit" : "Confirm Add"}
                </button>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Club;
