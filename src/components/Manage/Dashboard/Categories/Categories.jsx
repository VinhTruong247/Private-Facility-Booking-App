import React, { useEffect, useState } from 'react';
import { postSportType, getSportList, putUpdateSportType, deleteSportType } from '../../../../services/sportTypeService';
import { toast } from "react-toastify";
import styles from "./Categories.module.scss";

function Categories() {
  const [sportType, setSportType] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    capacity: 0,
    beginAt: "",
    endAt: "",
    courtId: 0,
    memberId: 0
  });

  const toggleExpand = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedCategory(null); // Reset edited category data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateSportType(editedCategory.id, editedCategory);
        setSportType(prevSportType => prevSportType.map(sport => sport.id === editedCategory.id ? editedCategory : sport));
        toast.success("Sport Type updated successfully.");
      } else {
        await postSportType(newCategory);
        toast.success("New Sport Type added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new Sport Type.");
    }
    // Reset form fields and close popup
    setNewCategory({
      capacity: 0,
      beginAt: "",
      endAt: "",
      courtId: 0,
      memberId: 0
    });
    togglePopup();
  };

  const handleEdit = (category) => {
    setEditedCategory(category);
    setEditMode(true);
    setShowPopup(true);
  };

  useEffect(() => {
    const fetchSportType = async () => {
      try {
        const res = await getSportList({}, 1, 10);
        if (res.data && res.data.items) {
          setSportType(res.data.items);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchSportType();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      const res = await deleteSportType(categoryId);
      if (res.succeeded) {
        toast.success("Delete successfully");
        const updatedSport = sportType.filter(sport => sport.id !== categoryId);
        setSportType(updatedSport);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete area.");
    }
  };

  return (
    <div className={styles["category-section"]}>
      <div className={styles["label-container"]}>
        <h2 className={styles["category-title"]}>Categories</h2>
      </div>

      <div className={styles["category-list"]}>
        {sportType.map((sport) => (
          <div key={sport.id} className={styles["category"]}>
            <div
              className={styles["category-header"]}
              onClick={() => toggleExpand(sport.id)}
            >
              <div className={styles["category-name"]}>{sport.name}</div>
              <div className={styles["category-toggle"]}>
                {expandedCategory === sport.id ? "-" : "+"}
              </div>
            </div>
            {expandedCategory === sport.id && (
              <div className={styles["category-description"]}>
                {sport.description}
                <div className={styles["button-container"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(sport)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(sport.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles["add-button"]} onClick={togglePopup}>
        +
      </button>
      {showPopup && (
        <div className={styles["popup"]}>
          <div className={styles["popup-content"]}>
            <h2>{editMode ? "Edit Category" : "Add Category"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
            >
              <div className={styles["form-group"]}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editMode ? editedCategory.name : newCategory.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  value={
                    editMode
                      ? editedCategory.description
                      : newCategory.description
                  }
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value
                    })
                  }
                />
              </div>
              <div className={styles["button-container"]}>
                <button className={styles["confirm-button"]} type="submit">
                  {editMode ? "Confirm Edit" : "Confirm Add"}
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
}

export default Categories;
