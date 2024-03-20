import React, { useEffect, useState } from 'react';
import { postCreateSlot, putUpdateSlot, getVinSlotList } from '../../../../services/vinSlotService';
import { toast } from "react-toastify";
import styles from "./VinSlot.module.scss";

const VinSlot = () => {
  const [vinSlots, setVinSlots] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [expandedVinSlot, setExpandedVinSlot] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedVinSlot, setEditedVinSlot] = useState(null);
  const [newVinSlot, setNewVinSlot] = useState({
    capacity: 0,
    beginAt: "",
    endAt: "",
    courtId: 0,
    memberId: 0
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedVinSlot(null); // Reset edited vin slot data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVinSlot((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setEditedVinSlot((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateSlot(editedVinSlot.id, editedVinSlot);
        setVinSlots(prevVinSlots => prevVinSlots.map(vinSlot => vinSlot.id === editedVinSlot.id ? editedVinSlot : vinSlot));
        toast.success("Vin-slot updated successfully.");
      } else {
        await postCreateSlot(newVinSlot);
        toast.success("New slot added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new slot.");
    }
    // Reset form fields and close popup
    setNewVinSlot({
      capacity: 0,
      beginAt: "",
      endAt: "",
      courtId: 0,
      memberId: 0
    });
    togglePopup();
  };

  const handleEdit = (vinSlot) => {
    setEditedVinSlot(vinSlot); // Update state with the vin slot being edited
    setEditMode(true);
    setShowPopup(true);
  };

  useEffect(() => {
    const fetchVinSlots = async () => {
      try {
        const res = await getVinSlotList({ pageSize: 20 });
        if (res.data && res.data.items) {
          const sortedVinSlots = res.data.items.sort((a, b) => {
            return a.beginAt.localeCompare(b.beginAt);
          });
          setVinSlots(sortedVinSlots);
        }
      } catch (error) {
        console.error('Error fetching vin slots:', error);
      }
    };

    fetchVinSlots();
  }, []);

  return (
    <div className={styles["vin-slot-container"]}>
      <div className={styles["label-container"]}>
        <h2>Vin Slots</h2>
      </div>
      <div className={styles["vin-slot-list"]}>
      {vinSlots.map((slot) => (
          <div
            key={slot.id}
            className={styles["vin-slot"]}
            onClick={() =>
              setExpandedVinSlot(expandedVinSlot === slot.id ? null : slot.id)
            }
          >
            
            <div className={styles["slot-info"]}>
              <div>
                <strong>Court:</strong> {slot.court.name}
              </div>
              <div>
                <strong>Type:</strong> {slot.court.type}
              </div>
            </div>
            {expandedVinSlot === slot.id && (
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
                  value={editMode ? editedVinSlot.courtName : newVinSlot.courtName}
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
                    editMode ? editedVinSlot.sportType : newVinSlot.courtType
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
                  value={editMode ? editedVinSlot.capacity : newVinSlot.capacity}
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
                  value={editMode ? editedVinSlot.status : newVinSlot.status}
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
                  value={editMode ? editedVinSlot.beginAt : newVinSlot.beginAt}
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
                  value={editMode ? editedVinSlot.endAt : newVinSlot.endAt}
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
                      ? editedVinSlot.createdByUsername
                      : newVinSlot.createdByUsername
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
                    editMode ? editedVinSlot.createdByClub : newVinSlot.createdByClub
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

export default VinSlot;