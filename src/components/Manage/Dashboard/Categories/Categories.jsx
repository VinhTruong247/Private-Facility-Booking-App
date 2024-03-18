import React, { useState } from "react";
import styles from "./Categories.module.scss";

const categoriesData = [
  {
    id: 1,
    name: "Football",
    description:
      "A team sport played by a team of 11 players against another team of 11 players on a field"
  },
  {
    id: 2,
    name: "Basketball",
    description:
      "A game played between two teams of five players each on a rectangular court, usually indoors"
  },
  {
    id: 3,
    name: "Badminton",
    description:
      "Court or lawn game played with lightweight rackets and a shuttlecock"
  },
  {
    id: 4,
    name: "Tennis",
    description:
      "A game in which two opposing players (singles) or pairs of players (doubles) use tautly strung rackets to hit a ball of a specified size and weight"
  },
  {
    id: 5,
    name: "Volleyball",
    description:
      "A game played by two teams, usually of six players on a side, in which the players use their hands to bat a ball back and forth over a high net, trying to make the ball touch the court within the opponents playing area before it can be returned"
  }
];

function Categories() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
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

  const handleConfirm = () => {
    if (editMode) {
      // Handle edit action here
      console.log("Edited category:", editedCategory);
    } else {
      // Add new category logic here
      // For now, just log the new category data
      console.log("New category:", newCategory);
    }
    // Reset form fields and close popup
    setNewCategory({ name: "", description: "" });
    togglePopup();
  };

  const handleEdit = (category) => {
    setEditedCategory(category);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (categoryId) => {
    // Handle delete action here
    console.log("Deleted category with ID:", categoryId);
  };

  return (
    <div className={styles["category-section"]}>
      <div className={styles["label-container"]}>
        <h2 className={styles["category-title"]}>Categories</h2>
      </div>

      <div className={styles["category-list"]}>
        {categoriesData.map((category) => (
          <div key={category.id} className={styles["category"]}>
            <div
              className={styles["category-header"]}
              onClick={() => toggleExpand(category.id)}
            >
              <div className={styles["category-name"]}>{category.name}</div>
              <div className={styles["category-toggle"]}>
                {expandedCategory === category.id ? "-" : "+"}
              </div>
            </div>
            {expandedCategory === category.id && (
              <div className={styles["category-description"]}>
                {category.description}
                <div className={styles["button-container"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(category.id)}
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
