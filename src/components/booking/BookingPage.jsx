import React, { useState, useEffect } from "react";
import "./BookingStyle.scss";
import { postCreateSlot } from "../../services/vinSlotService";
import { getAllMembers } from "../../services/memberService";
import { getCourtList } from "../../services/courtService";

function BookingPage({ memberId, ...props }) {
  const [capacity, setCapacity] = useState(0);
  const [beginAt, setBeginAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [courtId, setCourtId] = useState(0);
  const [memberIdInput, setMemberIdInput] = useState(memberId || "");
  const [members, setMembers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [confirmationData, setConfirmationData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable to control confirmation form visibility

  useEffect(() => {
    async function fetchData() {
      try {
        const membersResponse = await getAllMembers({});
        console.log("Members response:", membersResponse);
        setMembers(membersResponse.data.items); // Assuming members are nested under a 'members' key

        const courtsResponse = await getCourtList({});
        console.log("Courts response:", courtsResponse);
        setCourts(courtsResponse.data.items); // Assuming courts are nested under a 'courts' key

        setLoading(false); // Data fetching completed
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    }

    fetchData();
  }, []);

  const handleMemberChange = (selectedMemberId) => {
    setMemberIdInput(selectedMemberId);
  };

  const handleCourtChange = (selectedCourtId) => {
    setCourtId(selectedCourtId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate capacity
    if (!capacity || capacity <= 0) {
      alert("Please provide a valid capacity.");
      return;
    }
  
    // Validate beginAt
    if (!beginAt) {
      alert("Please provide a valid begin date and time.");
      return;
    }
  
    // Validate endAt
    if (!endAt) {
      alert("Please provide a valid end date and time.");
      return;
    }
  
    // Validate courtId
    if (!courtId) {
      alert("Please select a court.");
      return;
    }
  
    // Validate memberIdInput
    if (!memberIdInput || isNaN(memberIdInput.trim())) {
      alert("Please provide a valid member ID.");
      return;
    }
  
    try {
      const response = await postCreateSlot({
        capacity: capacity,
        beginAt: beginAt,
        endAt: endAt,
        courtId: courtId,
        memberId: parseInt(memberIdInput)
      });
  
      // Store booked slot details for confirmation
      setConfirmationData(response.data);
  
      // Reset form fields after successful booking
      setCapacity("");
      setBeginAt("");
      setEndAt("");
      setCourtId(0);
      setMemberIdInput("");
    } catch (error) {
      console.error("Error creating slot:", error);
      alert("Failed to create slot. Please try again.");
    }
  };
  

  const handleCloseConfirmation = () => {
    setShowConfirmation(false); // Hide confirmation form
    setConfirmationData(null); // Reset confirmation data
  };

  return (
    <div className="booking-container">
      <h1>Book a Facility</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <label htmlFor="beginAt">Begin At:</label>
        <input
          type="datetime-local"
          id="beginAt"
          name="beginAt"
          value={beginAt}
          onChange={(e) => setBeginAt(e.target.value)}
        />

        <label htmlFor="endAt">End At:</label>
        <input
          type="datetime-local"
          id="endAt"
          name="endAt"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
        />

        <label htmlFor="courtId">Court:</label>
        <select
          id="courtId"
          name="courtId"
          value={courtId}
          onChange={(e) => handleCourtChange(e.target.value)}
        >
          <option value="">Select Court</option>
          {loading ? (
            <option disabled>Loading courts...</option>
          ) : (
            courts &&
            courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name}
              </option>
            ))
          )}
        </select>

        <label htmlFor="memberId">Member:</label>
        <select
          id="memberId"
          name="memberId"
          value={memberIdInput}
          onChange={(e) => handleMemberChange(e.target.value)}
        >
          <option value="">Select Member</option>
          {loading ? (
            <option disabled>Loading members...</option>
          ) : (
            members &&
            members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.user}
              </option>
            ))
          )}
        </select>

        <button type="submit">Book</button>
      </form>

      {/* Confirmation form */}

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <h2>Booking Confirmation</h2>
            <p>ID: {confirmationData?.id}</p>
            <p>Status: {confirmationData?.status}</p>
            <p>Created At: {confirmationData?.createdAt}</p>
            <p>Updated At: {confirmationData?.updatedAt}</p>
            <button onClick={handleCloseConfirmation}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
