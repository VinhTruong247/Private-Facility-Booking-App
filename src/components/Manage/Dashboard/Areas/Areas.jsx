import React, { useEffect, useState } from 'react';
import { postCreateArea, putUpdateArea, getAreaList, deleteArea } from '../../../../services/areaService';
import { toast } from "react-toastify";
import styles from "./Areas.module.scss"; // Import styles module

const Areas = () => {
  const [areas, setAreas] = useState([]);
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

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateArea(editedArea.id, editedArea);
        setAreas(prevAreas => prevAreas.map(area => area.id === editedArea.id ? editedArea : area));
        toast.success("Area updated successfully.");
      } else {
        await postCreateArea(newArea);
        toast.success("New area added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new area.");
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

  const handleDelete = async (areaId) => {
    try {
      const res = await deleteArea(areaId);
      if (res.succeeded) {
        toast.success("Delete successfully");
        const updatedAreas = areas.filter(area => area.id !== areaId);
        setAreas(updatedAreas);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete area.");
    }
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await getAreaList({ pageSize: 20 });
        if (res.data && res.data.items) {
          const sortedAreas = res.data.items.sort((a, b) => {
            const numA = parseInt(a.name.substring(1));
            const numB = parseInt(b.name.substring(1));
            return numA - numB;
          });
          setAreas(sortedAreas);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className={styles["areas-container"]}>
      <div className={styles["label-container"]}>
        <h2>Areas</h2>
      </div>
      <div className={styles["area-list"]}>
        {areas.map((area) => (
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

      <div className={styles["add-button"]} onClick={togglePopup}>+</div>

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