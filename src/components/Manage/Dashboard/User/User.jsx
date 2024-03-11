import React, { useState } from "react";
import "./User.scss";

const sampleUsers = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    address: "Address 1",
    phone: "1234567890",
    dob: "1990-01-01",
    roleId: 1 // Assuming roleId represents some role ID
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    address: "Address 2",
    phone: "1234567891",
    dob: "1991-02-02",
    roleId: 2
  },
  // Add more sample users as needed
  {
    id: 3,
    username: "user3",
    password: "password3",
    address: "Address 3",
    phone: "1234567892",
    dob: "1992-03-03",
    roleId: 3
  },
  {
    id: 4,
    username: "user4",
    password: "password4",
    address: "Address 4",
    phone: "1234567893",
    dob: "1993-04-04",
    roleId: 4
  },
  {
    id: 5,
    username: "user5",
    password: "password5",
    address: "Address 5",
    phone: "1234567894",
    dob: "1994-05-05",
    roleId: 5
  },
  {
    id: 6,
    username: "user6",
    password: "password6",
    address: "Address 6",
    phone: "1234567895",
    dob: "1995-06-06",
    roleId: 6
  },
  {
    id: 7,
    username: "user7",
    password: "password7",
    address: "Address 7",
    phone: "1234567896",
    dob: "1996-07-07",
    roleId: 7
  },
  {
    id: 8,
    username: "user8",
    password: "password8",
    address: "Address 8",
    phone: "1234567897",
    dob: "1997-08-08",
    roleId: 8
  }
];
function User() {
  const [expandedUser, setExpandedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    address: "",
    phone: "",
    dob: "",
    roleId: ""
  });

  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    // Perform any necessary actions to add the new user
    console.log("New User:", newUser);
    // Reset the form and close the popup
    setNewUser({
      username: "",
      password: "",
      address: "",
      phone: "",
      dob: "",
      roleId: ""
    });
    setShowPopup(false);
  };
  return (
    <div className="user-container">
      <div className="label-container">
        <h2>User</h2>
      </div>

      <div className="user-list">
        {sampleUsers.map((user) => (
          <div key={user.id} className="user-box">
            <h3 onClick={() => toggleExpand(user.id)}>
              {user.username}
            </h3>
            {expandedUser === user.id && (
              <div className="user-details">
                <p>Password: {user.password}</p>
                <p>Address: {user.address}</p>
                <p>Phone: {user.phone}</p>
                <p>Date of Birth: {user.dob}</p>
                <p>Role ID: {user.roleId}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-button" onClick={togglePopup}>+</div>

      {showPopup && (
        <div className="modal">
          <div className="popup-box">
            <h2>Add User</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username"
                  value={newUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  value={newUser.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone number"
                  value={newUser.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  placeholder="Enter date of birth"
                  value={newUser.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="roleId">Role ID:</label>
                <input
                  type="text"
                  name="roleId"
                  id="roleId"
                  placeholder="Enter role ID"
                  value={newUser.roleId}
                  onChange={handleChange}
                />
              </div>
              <div className="button-container">
                <button
                  className="confirm-button"
                  type="button"
                  onClick={handleAddUser}
                >
                  Confirm
                </button>
                <button
                  className="cancel-button"
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

export default User;