import React, { useEffect, useState } from 'react';
import { postCreateClub, getClubList, putUpdateClub, deleteClub } from '../../../../services/clubService';
import { toast } from "react-toastify";
import "./Club.scss";

const Club = () => {
  const [clubs, setClub] = useState([]);
  const [expandedClub, setExpandedClub] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedClub, setEditedClub] = useState(null);
  const [newClub, setNewClub] = useState({
    name: "",
    email: "",
    description: "",
    sportTypeId: 0
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false);
    setEditedClub(null); // Reset edit mode when closing the popup
  };

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateClub(editedClub.id, editedClub);
        setClub(prevClub => prevClub.map(club => club.id === editedClub.id ? editedClub : club));
        toast.success("Club updated successfully.");
      } else {
        await postCreateClub(newClub);
        toast.success("New club added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new club.");
    }
    // Reset the form and close the popup
    setNewClub({
      name: "",
      email: "",
      description: "",
      sportTypeId: 0
    });
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

  const handleDelete = async (clubId) => {
    try {
      const res = await deleteClub(clubId);
      if (res.succeeded) {
        toast.success("Delete successfully");
        const updatedClub = clubs.filter(club => club.id !== clubId);
        setClub(updatedClub);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete club.");
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await getClubList({ pageSize: 20 });
        if (res.data && res.data.items) {
          setClub(res.data.items);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="club-container">
      <div className="label-container">
        <h2>Clubs</h2>
      </div>
      <div className="club-list">
        {clubs.map((club) => (
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
