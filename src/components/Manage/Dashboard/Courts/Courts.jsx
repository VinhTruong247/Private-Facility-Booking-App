import React, { useEffect, useState } from 'react';
import { postCreateCourt, getCourtList, putUpdateCourt, deleteCourt } from '../../../../services/courtService';
import { toast } from "react-toastify";
import "./Courts.scss";

const Courts = () => {
  const [courts, setCourt] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [expandedCourt, setExpandedCourt] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCourt, setEditedCourt] = useState(null);
  const [newCourt, setNewCourt] = useState({
    name: "",
    description: "",
    sportTypeId: 0,
    areaId: 0
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

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateCourt(editedCourt.id, editedCourt);
        setCourt(prevCourt => prevCourt.map(court => court.id === editedCourt.id ? editedCourt : court));
        toast.success("Court updated successfully.");
      } else {
        await postCreateCourt(newCourt);
        toast.success("New court added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new court.");
    }
    // Reset the form and close the popup
    setNewCourt({
      name: "",
      description: "",
      sportTypeId: 0,
      areaId: 0
    });
    togglePopup();
  };

  const handleCancel = () => {
    togglePopup();
  };

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await getCourtList({ pageSize: 30 });
        if (res.data && res.data.items) {
          setCourt(res.data.items);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchCourts();
  }, []);

  const groupedCourts = {};
  courts.forEach((court) => {
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
  const handleDelete = async (courtId) => {
    try {
      const res = await deleteCourt(courtId);
      if (res.succeeded) {
        toast.success("Delete successfully");
        const updatedCourt = courts.filter(court => court.id !== courtId);
        setCourt(updatedCourt);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete area.");
    }
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
