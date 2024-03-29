import React, { useEffect, useState } from "react";
import styles from "./Roles.module.scss";
import { postCreateRole, getRoleList, deleteRole } from "../../../../services/rolesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Roles = () => {
  const [roles, setRole] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [expandedRole, setExpandedRole] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRole, setEditedRole] = useState({}); // Initialize with an empty object
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: []
  });

  console.log(roles)

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

  const handleConfirm = async () => {
    try {
      if (editMode) {
      } else {
        await postCreateRole(newRole);
        toast.success("New role added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new role.");
    }
    setNewRole({
      name: "",
      description: "",
      permissions: []
    });
    togglePopup();
  };

  const handleCancel = () => {
    togglePopup();
  };

  const handleEdit = (role) => {
    setEditedRole(role);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (roleId) => {
    try {
      const res = await deleteRole(roleId);
      if (res.succeeded) {
        toast.success("Delete successfully");
        const updatedRole = roles.filter(role => role.id !== roleId);
        setRole(updatedRole);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete club.");
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoleList();
        if (res.data && res.data.permissions) {
          setRole(res.data.permissions);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className={styles["roles-container"]}>
      <div className={styles["label-container"]}>
        <h2>Roles</h2>
      </div>
      <div className={styles["role-columns"]}>
        {roles.map((role) => (
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
