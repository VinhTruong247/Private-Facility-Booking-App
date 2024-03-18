import React, { useState } from "react";
import styles from "./Areas.module.scss"; // Import styles module

const Areas = () => {
  const [expandedArea, setExpandedArea] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedArea, setEditedArea] = useState(null);
  const [newArea, setNewArea] = useState({
    name: "",
    address: ""
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedArea(null); // Reset edited area data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArea((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setEditedArea((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleConfirm = () => {
    if (editMode) {
      // Handle edit action here
      console.log("Edited area:", editedArea);
    } else {
      // Add new area logic here
      // For now, just log the new area data
      console.log("New area:", newArea);
    }
    // Reset form fields and close popup
    setNewArea({
      name: "",
      address: ""
    });
    togglePopup();
  };

  const handleEdit = (area) => {
    setEditedArea(area); // Update state with the area being edited
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (areaId) => {
    // Handle delete action here
    console.log("Deleted area with ID:", areaId);
  };

  const areaData = [
    {
      id: 10,
      name: "S10",
      address: "The Origami block, Vinhomes Grand Park"
    },
    {
      id: 1,
      name: "S01",
      address: "The Rainbow block, Vinhomes Grand Park"
    },
    {
      id: 2,
      name: "S02",
      address: "The Rainbow block, Vinhomes Grand Park"
    },
    {
      id: 3,
      name: "S03",
      address: "The Rainbow block, Vinhomes Grand Park"
    },
    {
      id: 5,
      name: "S05",
      address: "The Rainbow block, Vinhomes Grand Park"
    },
    {
      id: 7,
      name: "S07",
      address: "The Origami block, Vinhomes Grand Park"
    },
    {
      id: 4,
      name: "S04",
      address: "The Rainbow block, Vinhomes Grand Park"
    },
    {
      id: 8,
      name: "S08",
      address: "The Origami block, Vinhomes Grand Park"
    },
    {
      id: 6,
      name: "S06",
      address: "The Origami block, Vinhomes Grand Park"
    },
    {
      id: 9,
      name: "S09",
      address: "The Origami block, Vinhomes Grand Park"
    }
  ];


  return (
    <div className={styles["areas-container"]}>
      <div className={styles["label-container"]}>
        <h2>Areas</h2>
      </div>
      <div className={styles["area-list"]}>
        {areaData.map((area) => (
          <div
            key={area.id}
            className={styles["area"]}
            onClick={() =>
              setExpandedArea(expandedArea === area.id ? null : area.id)
            }
          >
            <div className={styles["area-name"]}>{area.name}</div>
            {expandedArea === area.id && (
              <div className={styles["area-details"]}>
                <div>
                  <strong>Address:</strong> {area.address}
                </div>
                <div className={styles["button-container"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(area)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(area.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles["add-button"]} onClick={togglePopup}>
        +
      </div>
      {showPopup && (
        <div className={styles["modal"]}>
          <div className={styles["popup-box"]}>
            <h2>{editMode ? "Edit Area" : "Add Area"}</h2>
            <form>
              <div className={styles["form-group"]}>
                <label htmlFor="area-name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editMode ? editedArea.name : newArea.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="area-address">Address:</label>
                <input
                  type="text"
                  id="area-address"
                  name="address"
                  rows="6"
                  value={editMode ? editedArea.address : newArea.address}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["button-container"]}>
                <button
                  className={styles["confirm-button"]}
                  type="button"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className={styles["cancel-button"]}
                  type="button"
                  onClick={togglePopup}
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

export default Areas;