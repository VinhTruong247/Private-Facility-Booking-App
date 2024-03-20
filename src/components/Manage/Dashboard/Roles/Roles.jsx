import React, { useEffect, useState } from "react";
import styles from "./Roles.module.scss";
import { postCreateRole, getRoleList, deleteRole } from "../../../../services/rolesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Roles = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [expandedRole, setExpandedRole] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRole, setEditedRole] = useState({}); // Initialize with an empty object
  const [newRole, setNewRole] = useState({
    role: "",
    description: "",
    isActive: true,
    permissions: []
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false);
    setEditedRole({}); // Reset to empty object
  };

  const handleRoleClick = (roleId) => {
    if (expandedRole === roleId) {
      setExpandedRole(null);
    } else {
      setExpandedRole(roleId);
    }
  };

  const handleConfirm = () => {
    if (editMode) {
      // Handle edit action here
      console.log("Edited Role:", editedRole);
    } else {
      // Handle add action here
      console.log("New Role:", newRole);
    }
    setNewRole({
      role: "",
      description: "",
      isActive: true,
      permissions: []
    });
    togglePopup();
  };

  const handleCancel = () => {
    setNewRole({
      role: "",
      description: "",
      isActive: true,
      permissions: []
    });
    togglePopup();
  };

  const handleEdit = (role) => {
    setEditedRole(role);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (roleId) => {
    console.log("Deleted Role with ID:", roleId);
  };

  const roleData = [
    {
      id: 9,
      name: "User_update1",
      description: "",
      isActive: true,
      permissions: [
        {
          id: 3,
          name: "USER_CREATE",
          description: "Something",
          apiPath: "api/v1/users",
          method: "put"
        }
      ]
    },
    {
      id: 10,
      name: "Something",
      description: "This is the role of...",
      isActive: true,
      permissions: [
        {
          id: 4,
          name: "USER_UPDATE",
          description: "Permission to update a User",
          apiPath: "api/v1/users",
          method: "POST"
        },
        {
          id: 3,
          name: "USER_CREATE",
          description: "Something",
          apiPath: "api/v1/users",
          method: "put"
        }
      ]
    },
    {
      id: 2,
      name: "USER",
      description: "Normal user",
      isActive: true,
      permissions: []
    },
    {
      id: 4,
      name: "ADMIN",
      description: "System admin",
      isActive: true,
      permissions: []
    },
    {
      id: 3,
      name: "VIN_MEMBER",
      description: "Vinhome residence",
      isActive: true,
      permissions: []
    }
  ];

  return (
    <div className={styles["roles-container"]}>
      <div className={styles["label-container"]}>
        <h2>Roles</h2>
      </div>
      <div className={styles["role-columns"]}>
        {roleData.map((role) => (
          <div
            key={role.id}
            className={styles["role"]}
            onClick={() => handleRoleClick(role.id)}
          >
            <div className={styles["role-name"]}>{role.name}</div>
            {expandedRole === role.id && (
              <div
                className={styles["role-details"]}
                onClick={() => handleRoleClick(role.id)}
              >
                <div>
                  <strong>Description:</strong> {role.description}
                </div>
                <div>
                  <strong>Active:</strong>{" "}
                  <span style={{ color: role.isActive ? "green" : "red" }}>
                    {role.isActive ? "Yes" : "No"}
                  </span>
                </div>
                <div className={styles["button-container"]}>
                  <button
                    className={`${styles["edit-button"]} ${styles["button"]}`}
                    onClick={() => handleEdit(role)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles["delete-button"]} ${styles["button"]}`}
                    onClick={() => handleDelete(role.id)}
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
            <h2>{editMode ? "Edit Role" : "Add Role"}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="role-name">Name:</label>
                <input
                  type="text"
                  id="role-name"
                  name="name"
                  value={editedRole.name || ""}
                  onChange={(e) =>
                    setEditedRole({ ...editedRole, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="role-description">Description:</label>
                <input
                  type="text"
                  id="role-description"
                  name="description"
                  value={editedRole.description || ""}
                  onChange={(e) =>
                    setEditedRole({
                      ...editedRole,
                      description: e.target.value
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="role-active">Active:</label>
                <div className="checkbox-container">
                  <div
                    onClick={() =>
                      setEditedRole({
                        ...editedRole,
                        isActive: !editedRole.isActive
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={editedRole.isActive ? faCheckSquare : faSquare}
                      className="checkbox-icon"
                      style={{
                        fontSize: `${editedRole.isActive ? "inherit" : "1em"}`
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles["button-container"]}>
                <button
                  className={`${styles["confirm-button"]} ${styles["button"]}`}
                  type="button"
                  onClick={handleConfirm}
                >
                  {editMode ? "Confirm Edit" : "Confirm Add"}
                </button>
                <button
                  className={`${styles["cancel-button"]} ${styles["button"]}`}
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

export default Roles;
