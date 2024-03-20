import React, { useEffect, useState } from "react";
import { postCreateUser, putUpdateUser, getAllUsers } from '../../../../services/userService';
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
    roleId: 0
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditMode(false); // Reset edit mode when closing the popup
    setEditedUser(null); // Reset edited user data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleConfirm = async () => {
    try {
      if (editMode) {
        await putUpdateUser(editedUser.id, editedUser);
        setUsers(prevUsers => prevUsers.map(user => user.id === editedUser.id ? editedUser : user));
        toast.success("User updated successfully.");
      } else {
        await postCreateUser(newUser);
        toast.success("New user added successfully.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to add new user.");
    }
    // Reset form fields and close popup
    setNewUser({
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      dob: "",
      roleId: 0
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
          const sortedUsers = res.data.items.sort((a, b) => {
            return a.username.localeCompare(b.username);
          });
          setUsers(sortedUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles["users-container"]}>
      <div className={styles["label-container"]}>
        <h2>Users</h2>
      </div>
      <div className={styles["user-list"]}>
        {users.map((user) => (
          <div
            key={user.id}
            className={styles["user"]}
            onClick={() =>
              setExpandedUser(expandedUser === user.id ? null : user.id)
            }
          >
            <div className={styles["user-name"]}>{user.username}</div>
            {expandedUser === user.id && (
              <div className={styles["user-details"]}>
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

      <div className={styles["add-button"]} onClick={togglePopup}>+</div>

      {showPopup && (
        <div className={styles["modal"]}>
          <div className={styles["popup-box"]}>
            <h2>{editMode ? "Edit User" : "Add User"}</h2>
            <form>
              <div className={styles["form-group"]}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editMode ? editedUser.username : newUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editMode ? editedUser.email : newUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={editMode ? editedUser.password : newUser.password}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editMode ? editedUser.address : newUser.address}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={editMode ? editedUser.phone : newUser.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={editMode ? editedUser.dob : newUser.dob}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="roleId">Role ID:</label>
                <input
                  type="number"
                  id="roleId"
                  name="roleId"
                  value={editMode ? editedUser.roleId : newUser.roleId}
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

export default User;