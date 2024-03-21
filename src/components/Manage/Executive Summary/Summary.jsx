import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/userService";
import { getVinSlotList } from "../../../services/vinSlotService";
import { getSportList } from "../../../services/sportTypeService"; // Import getSportList function
import { getCourtList } from "../../../services/courtService";
import { getAreaList } from "../../../services/areaService";
import { getClubList } from "../../../services/clubService";
import "./Summary.scss";
import { toast } from "react-toastify"; // Import getClubList function
const Summary = () => {
  const LIMIT = 10;
  const [users, setUsers] = useState([]); // Define the users state variable

  const [courtList, setCourtList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [sportTypeId, setSportTypeId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [totalAreas, setTotalAreas] = useState(0);
  const [totalSportTypes, setTotalSportTypes] = useState(0); // New state for total sport types
  const [totalClubs, setTotalClubs] = useState(0); // New state for total clubs
  const [loading, setLoading] = useState(true);
  const [expandedBox, setExpandedBox] = useState(null);
  const fetchAllUsers = async (
    current = 1,
    username = "",
    email = "",
    phone = "",
    isActive = undefined,
    roleId = "",
    sortBy = "",
    sortDescend = false
  ) => {
    try {
      const res = await getAllUsers({
        username: username,
        email: email,
        phone: phone,
        isActive: isActive,
        roleId: roleId,
        current,
        pageSize: LIMIT,
        sortBy: sortBy,
        sortDescending: sortDescend
      });
  
      if (res && res.data && res.data.items) {
        setUsers(res.data.items); // Update users state with fetched data
        setTotalUsers(res.data.totalItems);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error("An error occurred while fetching user list");
      setLoading(false);
    }
  };
  
  const fetchAllSlots = async (
    current = 1,
    status = "",
    createdBy = "",
    courtId = "",
    sortBy = "",
    sortDescend = false
  ) => {
    try {
      const res = await getVinSlotList({
        status: status,
        createdBy: createdBy,
        courtId: courtId,
        current,
        pageSize: LIMIT,
        sortBy: sortBy,
        sortDescending: sortDescend
      });

      if (res && res.data && res.data.items) {
        setTotalSlots(res.data.totalItems); // Update totalSlots state with totalItems count
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching slot list:", error);
      toast.error("An error occurred while fetching slot list");
      setLoading(false);
    }
  };

  const fetchAllSportTypes = async (
    name = "",
    sortBy = "",
    sortDescend = false
  ) => {
    try {
      const res = await getSportList({
        name: name,
        sortBy: sortBy,
        sortDescending: sortDescend
      });

      if (res && res.data && res.data.items) {
        setTotalSportTypes(res.data.totalItems);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching sport type list:", error);
      toast.error("An error occurred while fetching sport type list");
      setLoading(false);
    }
  };
  const fetchAllArea = async (name = "", sortBy = "", sortDescend = false) => {
    try {
      const res = await getAreaList({
        name: name,
        sortBy: sortBy,
        sortDescending: sortDescend
      });

      if (res && res.data && res.data.items) {
        // Extract total count and items from the response
        const { totalItems, items } = res.data;
        setTotalAreas(totalItems); // Update totalAreas state with totalItems count

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching area list:", error);
      toast.error("An error occurred while fetching area list");
      setLoading(false);
    }
  };
  const fetchAllClubs = async (
    name = "",
    email = "",
    isActive = undefined,
    sportTypeId = "",
    pageSize = LIMIT,
    sortBy = "",
    sortDescending = false
  ) => {
    try {
      const res = await getClubList({
        name: name,
        email: email,
        isActive: isActive,
        sportTypeId: sportTypeId,
        pageSize: pageSize,
        sortBy: sortBy,
        sortDescending: sortDescending
      });

      if (res && res.data && res.data.items) {
        setTotalClubs(res.data.totalItems); // Update totalClubs state with totalItems count
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching club list:", error);
      toast.error("An error occurred while fetching club list");
      setLoading(false);
    }
  };
  const fetchAllCourts = async (
    current = 1,
    sportTypeId = "",
    areaId = "",
    searchValue = "",
    sortValue = "",
    sortDescend = false
  ) => {
    try {
      const res = await getCourtList({
        name: searchValue,
        sportTypeId: sportTypeId,
        areaId: areaId,
        sortBy: sortValue,
        sortDescending: sortDescend,
        current,
        pageSize: LIMIT
      });

      if (res && res.data && res.data.items) {
        setPage(current);
        setTotalResult(res.data.totalItems);
        setCount(res.data.totalPages);
        setCourtList(res.data.items);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching court list:", error);
      toast.error("An error occurred while fetching court list");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllSlots();
    fetchAllArea();
    fetchAllSportTypes();
    fetchAllClubs();
    fetchAllCourts(); // Fetch sport type count on component mount
  }, []);
  const handleBoxClick = (boxName) => {
    if (expandedBox === boxName) {
      setExpandedBox(null); // Collapse if already expanded
    } else {
      setExpandedBox(boxName); // Expand if not expanded
    }
  };
  return (
    <div className="summary-container">
       <div
        className={`summary-box ${expandedBox === 'users' ? 'expanded' : ''}`}
        onClick={() => handleBoxClick('users')}
      >
        <h3>Total Users</h3>
        {expandedBox === 'users' && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>User List</h2>
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  {/* Add more user information as needed */}
                </div>
              ))}
              <button onClick={() => setExpandedBox(null)}>Close</button>
            </div>
          </div>
        )}
        <p className="count">{totalUsers}</p>
      </div>

      <div className="summary-box">
        <h3>Total Slots</h3>
        <p className="count">{totalSlots}</p>
      </div>
      <div className="summary-box">
        <h3>Total Sport Types</h3>
        <p className="count">{totalSportTypes}</p>{" "}
        {/* Display totalSportTypes state */}
      </div>
      <div className="summary-box">
        <h3>Total Areas</h3>
        <p className="count">{totalAreas}</p>{" "}
        {/* Display totalSportTypes state */}
      </div>
      <div className="summary-box">
        <h3>Total Clubs</h3>
        <p className="count">{totalClubs}</p>
      </div>
      <div className="summary-box">
        <h3>Total Courts</h3>
        <p className="count">{totalResult}</p>
      </div>
    </div>
  );
};

export default Summary;
