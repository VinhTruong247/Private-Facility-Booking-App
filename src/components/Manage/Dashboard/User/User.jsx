import React, { useEffect, useState } from "react";
import {
  postCreateUser,
  putUpdateUser,
  getAllUsers
} from "../../../../services/userService";
import styles from "./User.module.scss"; // Importing the SCSS module
import { toast } from "react-toastify";

const User = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    dob: "",
    roleId: ""
  });
  const rolesMap = {
    ADMIN: 4,
    Something: 10,
    USER: 2,
    VIN_MEMBER: 3
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedUser(null); // Reset edited user data
  };
  // State to store role options for select dropdown
  const [roleOptions, setRoleOptions] = useState([]);

  // Function to convert role name into roleId
  const getRoleIdByName = (roleName) => {
    return rolesMap[roleName];
  };
  const handleRoleChange = (e) => {
    const roleName = e.target.value;
    const roleId = getRoleIdByName(roleName);
    setNewUser((prevState) => ({
      ...prevState,
      roleId, // Update roleId instead of role
      role: roleName // Update role with the selected role name
    }));
    setEditedUser((prevState) => ({
      ...prevState,
      roleId, // Update roleId instead of role
      role: roleName // Update role with the selected role name
    }));
  };
  useEffect(() => {
    // Populate role options
    const options = Object.keys(rolesMap).map((roleName) => ({
      value: roleName,
      label: roleName
    }));
    setRoleOptions(options);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      // Reformat dob to yyyy-mm-dd format
      const formattedDob = new Date(value).toISOString().split("T")[0];
      setNewUser((prevState) => ({
        ...prevState,
        [name]: formattedDob
      }));
      setEditedUser((prevState) => ({
        ...prevState,
        [name]: formattedDob
      }));
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value
      }));
      setEditedUser((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateUser(editedUser.id, editedUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );
        toast.success("User updated successfully.");
      } else {
        // Format dob before creating a new user
        const formattedNewUser = {
          ...newUser,
          dob: new Date(newUser.dob).toISOString().split("T")[0]
        };
        await postCreateUser(formattedNewUser);
        toast.success("New user added successfully.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add new user.");
    }
    // Reset form fields and close popup
    setNewUser({
      username: "",
      email: "",
      address: "",
      phone: "",
      dob: "",
      roleId: ""
    });
    togglePopup();
  };

  const handleEdit = (user) => {
    setEditedUser(user); // Update state with the user being edited
    setEditMode(true);
    setShowPopup(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers({ pageSize: 20 });
        if (res.data && res.data.items) {
          const formattedUsers = res.data.items.map((user) => {
            // Extracting the date part from the dob string and formatting it
            const dobDate = new Date(user.dob);
            const formattedDob = dobDate.toISOString().split("T")[0];
            return {
              ...user,
              dob: formattedDob
            };
          });
          const sortedUsers = formattedUsers.sort((a, b) => {
            return a.username.localeCompare(b.username);
          });
          setUsers(sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles["user-container"]}>
      <div className={styles["label-container"]}>
        <h2>Users</h2>
      </div>
      <div className={styles["user-list"]}>
        {users.map((user) => (
          <div
            key={user.id}
            className={styles["user-box"]}
            onClick={() =>
              setExpandedUser(expandedUser === user.id ? null : user.id)
            }
          >
            <div className={styles["user-name"]}>{user.username}</div>
            {expandedUser === user.id && (
              <div className={styles["full-info"]}>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Address:</strong> {user.address}
                </div>
                <div>
                  <strong>Phone:</strong> {user.phone}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {user.dob}
                </div>
                <div className={styles["button-container"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  {/* <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button> */}
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
            <h2>{editMode ? "Edit User" : "Add User"}</h2>
            <form>
              <div style={{ display: "flex" }}>
                <div className={styles["input-column"]}>
                  <div className={styles["input-group"]}>
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={editMode ? editedUser.username : newUser.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["input-group"]}>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editMode ? editedUser.email : newUser.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["input-group"]}>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={editMode ? editedUser.dob : newUser.dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles["input-column"]}>
                  <div className={styles["input-group"]}>
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={editMode ? editedUser.address : newUser.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["input-group"]}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={editMode ? editedUser.phone : newUser.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["input-group"]}>
                    <label htmlFor="role">Role:</label>
                    {/* Select dropdown for role */}
                    <select
                      id="role"
                      name="role"
                      value={editMode ? editedUser.role : newUser.role}
                      onChange={handleRoleChange}
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>
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

export default User;
