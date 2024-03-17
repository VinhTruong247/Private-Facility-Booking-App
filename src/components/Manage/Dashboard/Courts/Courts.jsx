import React, { useState } from "react";
import "./Courts.scss";

const Courts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [expandedCourt, setExpandedCourt] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCourt, setEditedCourt] = useState(null);
  const [newCourt, setNewCourt] = useState({
    name: "",
    description: "",
    isAvailable: true,
    sportType: "",
    area: ""
  });
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedCourt(null); // Reset edited court data
  };

  const handleCourtClick = (courtId) => {
    if (expandedCourt === courtId) {
      setExpandedCourt(null);
    } else {
      setExpandedCourt(courtId);
    }
  };

  const handleConfirm = () => {
    if (editMode) {
      // Handle edit action here
      console.log("Edited Court:", editedCourt);
    } else {
      // Handle add action here
      console.log("New Court:", newCourt);
    }
    // Reset the form and close the popup
    setNewCourt({
      name: "",
      description: "",
      isAvailable: true,
      sportType: "",
      area: ""
    });
    togglePopup();
  };
  const handleCancel = () => {
    // Reset the form and close the popup
    setNewCourt({
      name: "",
      description: "",
      isAvailable: true,
      sportType: "",
      area: ""
    });
    togglePopup();
  };

  const courtsData = [
    {
      id: 51,
      name: "S1C1",
      description: "S1 Football Court",
      isAvailable: true,
      sportType: "Football",
      area: "S01"
    },
    {
      id: 52,
      name: "S1C2",
      description: "S1 Basketball Court",
      isAvailable: true,
      sportType: "Basketball",
      area: "S01"
    },
    {
      id: 53,
      name: "S1C3",
      description: "S1 Volleyball Court",
      isAvailable: true,
      sportType: "Volleyball",
      area: "S01"
    },
    {
      id: 54,
      name: "S1C4",
      description: "S1 Badminton Court",
      isAvailable: true,
      sportType: "Badminton",
      area: "S01"
    },
    {
      id: 55,
      name: "S1C5",
      description: "S1 Tennis Court",
      isAvailable: true,
      sportType: "Tennis",
      area: "S01"
    },
    {
      id: 56,
      name: "S2C1",
      description: "S2 Football Court",
      isAvailable: true,
      sportType: "Football",
      area: "S02"
    },
    {
      id: 57,
      name: "S2C2",
      description: "S2 Basketball Court",
      isAvailable: true,
      sportType: "Basketball",
      area: "S02"
    },
    {
      id: 58,
      name: "S2C3",
      description: "S2 Volleyball Court",
      isAvailable: true,
      sportType: "Volleyball",
      area: "S02"
    },
    {
      id: 59,
      name: "S2C4",
      description: "S2 Badminton Court",
      isAvailable: true,
      sportType: "Badminton",
      area: "S02"
    },
    {
      id: 60,
      name: "S2C5",
      description: "S2 Tennis Court",
      isAvailable: true,
      sportType: "Tennis",
      area: "S02"
    }
  ];
  const groupedCourts = {};
  courtsData.forEach((court) => {
    if (!groupedCourts[court.sportType]) {
      groupedCourts[court.sportType] = [];
    }
    groupedCourts[court.sportType].push(court);
  });

  const handleEdit = (court) => {
    setEditedCourt(court);
    setEditMode(true);
    setShowPopup(true);
  };
  const handleDelete = (courtId) => {
    // Handle delete action here
    console.log("Deleted Court with ID:", courtId);
  };
  return (
    <div className="courts-container">
      <div className="label-container">
        <h2>Courts</h2>
      </div>
      <div className="court-columns">
        {Object.keys(groupedCourts).map((sportType) => (
          <div key={sportType} className="sport-column">
            <h3>{sportType}</h3>
            {groupedCourts[sportType].map((court) => (
              <div
                key={court.id}
                className="court"
                onClick={() => handleCourtClick(court.id)}
              >
                <div className="court-name">{court.name}</div>
                {expandedCourt === court.id && (
                  <div className="court-details">
                    <div>
                      <strong>Description:</strong> {court.description}
                    </div>
                    <div>
                      <strong>Available:</strong>{" "}
                      {court.isAvailable ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Sport Type:</strong> {court.sportType}
                    </div>
                    <div>
                      <strong>Area:</strong> {court.area}
                    </div>
                    <div className="button-container">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(court)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(court.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="add-button" onClick={togglePopup}>
        +
      </div>
      {showPopup && (
        <div className="modal">
          <div className="popup-box">
            <h2>{editMode ? "Edit Court" : "Add Court"}</h2>
            <form>
              <div className="tiny-form">
                <div className="column-group">
                  <div className="form-group">
                    <label htmlFor="court-name">Court Name:</label>
                    <input
                      type="text"
                      id="court-name"
                      name="name"
                      placeholder="Enter Court Name"
                      value={editMode ? editedCourt.name : newCourt.name}
                      onChange={(e) =>
                        editMode
                          ? setEditedCourt({
                              ...editedCourt,
                              name: e.target.value
                            })
                          : setNewCourt({ ...newCourt, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="court-sport-type">Sport Type:</label>
                    <input
                      type="text"
                      id="court-sport-type"
                      name="sportType"
                      placeholder="Enter Sport Type"
                      value={
                        editMode ? editedCourt.sportType : newCourt.sportType
                      }
                      onChange={(e) =>
                        editMode
                          ? setEditedCourt({
                              ...editedCourt,
                              sportType: e.target.value
                            })
                          : setNewCourt({
                              ...newCourt,
                              sportType: e.target.value
                            })
                      }
                    />
                  </div>
                </div>
                <div className="column-group"><div className="form-group">
                <label htmlFor="court-description">Description:</label>
                <input
                  type="text"
                  id="court-description"
                  name="description"
                  placeholder="Enter Description"
                  value={
                    editMode ? editedCourt.description : newCourt.description
                  }
                  onChange={(e) =>
                    editMode
                      ? setEditedCourt({
                          ...editedCourt,
                          description: e.target.value
                        })
                      : setNewCourt({
                          ...newCourt,
                          description: e.target.value
                        })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="court-area">Area:</label>
                <input
                  type="text"
                  id="court-area"
                  name="area"
                  placeholder="Enter Area"
                  value={editMode ? editedCourt.area : newCourt.area}
                  onChange={(e) =>
                    editMode
                      ? setEditedCourt({ ...editedCourt, area: e.target.value })
                      : setNewCourt({ ...newCourt, area: e.target.value })
                  }
                />
              </div></div>
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

export default Courts;
