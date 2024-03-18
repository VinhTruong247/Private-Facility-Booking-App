import React, { useState } from "react";
import styles from "./VinSlot.module.scss";

const VinSlot = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedSlot, setEditedSlot] = useState(null);
  const [newSlot, setNewSlot] = useState({
    courtName: "",
    sportType: "",
    capacity: "",
    status: "",
    beginAt: "",
    endAt: "",
    createdByUsername: "",
    createdByClub: ""
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedSlot(null); // Reset edited slot data
  };

  const handleConfirm = () => {
    if (editMode) {
      // Handle edit action here
      console.log("Edited Slot:", editedSlot);
    } else {
      // Handle add action here
      console.log("New Slot:", newSlot);
    }
    // Reset the form and close the popup
    setNewSlot({
      courtName: "",
      sportType: "",
      capacity: "",
      status: "",
      beginAt: "",
      endAt: "",
      createdByUsername: "",
      createdByClub: ""
    });
    togglePopup();
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(selectedSlot === slot.id ? null : slot.id);
  };


  const handleCancel = () => {
    // Reset the form and close the popup
    setNewSlot({
      courtName: "",
      sportType: "",
      capacity: "",
      status: "",
      beginAt: "",
      endAt: "",
      createdByUsername: "",
      createdByClub: ""
    });
    togglePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };
  const vinSlotsData = [
    {
      id: 106,
      capacity: 10,
      status: "ONGOING",
      beginAt: "2024-03-12T13:00:00.708Z",
      endAt: "2024-03-12T15:00:00.708Z",
      court: {
        name: "S8C4",
        type: "Badminton"
      },
      createdBy: {
        username: "Marisol26",
        club: "Thunder Strikers FC"
      }
    },
    {
      id: 77,
      capacity: 15,
      status: "ONGOING",
      beginAt: "2024-03-06T15:00:00.704Z",
      endAt: "2024-03-06T17:00:00.704Z",
      court: {
        name: "S2C2",
        type: "Basketball"
      },
      createdBy: {
        username: "Marisol26",
        club: "Thunder Strikers FC"
      }
    },
    {
      id: 87,
      capacity: 20,
      status: "ONGOING",
      beginAt: "2024-03-08T15:00:00.706Z",
      endAt: "2024-03-08T17:00:00.706Z",
      court: {
        name: "S2C1",
        type: "Football"
      },
      createdBy: {
        username: "Keely.Botsford26",
        club: "Thunder Strikers FC"
      }
    },
    {
      id: 81,
      capacity: 10,
      status: "ONGOING",
      beginAt: "2024-03-07T13:00:00.705Z",
      endAt: "2024-03-07T15:00:00.705Z",
      court: {
        name: "S2C2",
        type: "Basketball"
      },
      createdBy: {
        username: "Josiah.Ruecker-Mayer",
        club: "Thunder Strikers FC"
      }
    },
    {
      id: 94,
      capacity: 20,
      status: "ONGOING",
      beginAt: "2024-03-10T09:00:00.707Z",
      endAt: "2024-03-10T11:00:00.707Z",
      court: {
        name: "S3C2",
        type: "Basketball"
      },
      createdBy: {
        username: "Malinda.Bosco21",
        club: "Blaze United"
      }
    },
    {
      id: 89,
      capacity: 15,
      status: "ONGOING",
      beginAt: "2024-03-09T09:00:00.706Z",
      endAt: "2024-03-09T11:00:00.706Z",
      court: {
        name: "S7C1",
        type: "Football"
      },
      createdBy: {
        username: "Alexie51",
        club: "Rally Rovers"
      }
    },
    {
      id: 78,
      capacity: 20,
      status: "ONGOING",
      beginAt: "2024-03-07T07:00:00.704Z",
      endAt: "2024-03-07T09:00:00.704Z",
      court: {
        name: "S10C2",
        type: "Basketball"
      },
      createdBy: {
        username: "Braxton.Morar",
        club: "Rally Rovers"
      }
    },
    {
      id: 75,
      capacity: 20,
      status: "ONGOING",
      beginAt: "2024-03-06T11:00:00.703Z",
      endAt: "2024-03-06T13:00:00.703Z",
      court: {
        name: "S10C1",
        type: "Football"
      },
      createdBy: {
        username: "Braxton.Morar",
        club: "Rally Rovers"
      }
    },
    {
      id: 80,
      capacity: 20,
      status: "ONGOING",
      beginAt: "2024-03-07T11:00:00.705Z",
      endAt: "2024-03-07T13:00:00.705Z",
      court: {
        name: "S4C2",
        type: "Basketball"
      },
      createdBy: {
        username: "Keon.Upton",
        club: "Eclipse Smashers"
      }
    },
    {
      id: 88,
      capacity: 20,
      status: "ONGOING",
      beginAt: "2024-03-09T07:00:00.706Z",
      endAt: "2024-03-09T09:00:00.706Z",
      court: {
        name: "S1C3",
        type: "Volleyball"
      },
      createdBy: {
        username: "Mae79",
        club: "Aurora Spikers"
      }
    }
    // Add more data as needed
  ];
  const handleEdit = (slot) => {
    setEditedSlot({
      ...slot,
      // Ensure all required fields are set, providing default values if necessary
      courtName: slot.court.name || "",
      sportType: slot.court.type || "",
      createdByUsername: slot.createdBy.username || "",
      createdByClub: slot.createdBy.club || ""
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (slotId) => {
    // Handle delete action here
    console.log("Deleted Slot with ID:", slotId);
  };

 
  return (
    <div className={styles["vin-slot-container"]}>
      <div className={styles["label-container"]}>
        <h2>Vin Slots</h2>
      </div>
      <div className={styles["vin-slot-list"]}>
        {vinSlotsData.map((slot) => (
          <div
            key={slot.id}
            className={`${styles["vin-slot"]} ${
              selectedSlot === slot.id ? styles["selected"] : ""
            }`}
            onClick={() => handleSlotClick(slot)}
          >
            <div className={styles["slot-info"]}>
              <div>
                <strong>Court:</strong> {slot.court.name}
              </div>
              <div>
                <strong>Type:</strong> {slot.court.type}
              </div>
            </div>
            {selectedSlot === slot.id && (
              <div className={styles["full-info"]}>
                <div>
                  <strong>Capacity:</strong> {slot.capacity}
                </div>
                <div>
                  <strong>Status:</strong> {slot.status}
                </div>
                <div>
                  <strong>Begin At:</strong> {slot.beginAt}
                </div>
                <div>
                  <strong>End At:</strong> {slot.endAt}
                </div>
                <div>
                  <strong>Created By:</strong> {slot.createdBy.username}
                </div>
                <div>
                  <strong>Club:</strong> {slot.createdBy.club}
                </div>
                <div className={styles["button-container"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(slot)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(slot.id)}
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
            <h2>{editMode ? "Edit Vin Slot" : "Add Vin Slot"}</h2>
            <form>
              <div className={styles["input-group"]}>
                <label htmlFor="courtName">Court Name:</label>
                <input
                  type="text"
                  name="courtName"
                  id="courtName"
                  placeholder="Enter court name"
                  value={editMode ? editedSlot.courtName : newSlot.courtName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="sportType">Sport Type:</label>
                <input
                  type="text"
                  name="sportType"
                  id="sportType"
                  placeholder="Enter sport type"
                  value={
                    editMode ? editedSlot.sportType : newSlot.courtType
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="capacity">Capacity:</label>
                <input
                  type="text"
                  name="capacity"
                  id="capacity"
                  placeholder="Enter capacity"
                  value={editMode ? editedSlot.capacity : newSlot.capacity}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Enter status"
                  value={editMode ? editedSlot.status : newSlot.status}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="beginAt">Begin At:</label>
                <input
                  type="text"
                  name="beginAt"
                  id="beginAt"
                  placeholder="Enter begin time"
                  value={editMode ? editedSlot.beginAt : newSlot.beginAt}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="endAt">End At:</label>
                <input
                  type="text"
                  name="endAt"
                  id="endAt"
                  placeholder="Enter end time"
                  value={editMode ? editedSlot.endAt : newSlot.endAt}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="createdByUsername">Created By Username:</label>
                <input
                  type="text"
                  name="createdByUsername"
                  id="createdByUsername"
                  placeholder="Enter username"
                  value={
                    editMode
                      ? editedSlot.createdByUsername
                      : newSlot.createdByUsername
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="createdByClub">Created By Club:</label>
                <input
                  type="text"
                  name="createdByClub"
                  id="createdByClub"
                  placeholder="Enter club"
                  value={
                    editMode ? editedSlot.createdByClub : newSlot.createdByClub
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={styles["button-container"]}>
                <button
                  className={styles["confirm-button"]}
                  type="button"
                  onClick={handleConfirm}
                >
                  {editMode ? "Save Changes" : "Add Slot"}
                </button>
                <button
                  className={styles["cancel-button"]}
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

export default VinSlot;