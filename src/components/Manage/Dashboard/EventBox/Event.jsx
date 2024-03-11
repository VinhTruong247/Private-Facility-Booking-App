import React, { useState } from 'react';
import "./Event.scss";

const Event = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    status: "ONGOING",
    club: ""
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleConfirm = () => {
    // Handle form submission or other actions here
    togglePopup();
  };

  const handleCancel = () => {
    togglePopup();
  };
  const eventData = [
    {
        "id": 181,
        "name": "Football League Kickoff",
        "location": "Stadium X",
        "description": "Opening of the football league season",
        "startDate": "2024-10-01T07:00:00.000Z",
        "endDate": "2024-10-11T06:59:59.000Z",
        "registrationDeadline": "2024-09-26T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Blaze United"
      },
      {
        "id": 182,
        "name": "Basketball Showdown",
        "location": "Arena Y",
        "description": "Exciting basketball exhibition match",
        "startDate": "2024-11-15T07:00:00.000Z",
        "endDate": "2024-11-21T06:59:59.000Z",
        "registrationDeadline": "2024-11-11T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Lunar Dunkers"
      },
      {
        "id": 183,
        "name": "Badminton Fun Day",
        "location": "Community Hall Z",
        "description": "Casual badminton games for a day of fun",
        "startDate": "2025-01-05T07:00:00.000Z",
        "endDate": "2025-01-06T06:59:59.000Z",
        "registrationDeadline": "2025-01-02T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Zen Smashers"
      },
      {
        "id": 184,
        "name": "Tennis Mixer Event",
        "location": "Tennis Courts W",
        "description": "Social tennis event with mix-and-match pairings",
        "startDate": "2025-02-10T07:00:00.000Z",
        "endDate": "2025-02-16T06:59:59.000Z",
        "registrationDeadline": "2025-02-06T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Rally Rovers"
      },
      {
        "id": 185,
        "name": "Volleyball Beach Bash",
        "location": "Sandy Shores",
        "description": "Beach volleyball tournament and celebration",
        "startDate": "2025-03-20T07:00:00.000Z",
        "endDate": "2025-03-26T06:59:59.000Z",
        "registrationDeadline": "2025-03-16T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Spike Surge"
      },
      {
        "id": 186,
        "name": "Football Skills Workshop",
        "location": "Training Grounds A",
        "description": "Workshop to enhance football skills and techniques",
        "startDate": "2025-04-10T07:00:00.000Z",
        "endDate": "2025-04-16T06:59:59.000Z",
        "registrationDeadline": "2025-04-06T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Blaze United"
      },
      {
        "id": 187,
        "name": "Basketball Youth Camp",
        "location": "Youth Center B",
        "description": "Youth basketball training camp for aspiring players",
        "startDate": "2025-05-05T07:00:00.000Z",
        "endDate": "2025-05-11T06:59:59.000Z",
        "registrationDeadline": "2025-05-02T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Elite Ballers"
      },
      {
        "id": 188,
        "name": "Badminton Doubles Tournament",
        "location": "Sports Hall C",
        "description": "Doubles badminton competition for club members",
        "startDate": "2025-06-15T07:00:00.000Z",
        "endDate": "2025-06-21T06:59:59.000Z",
        "registrationDeadline": "2025-06-11T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Zen Smashers"
      },
      {
        "id": 189,
        "name": "Tennis Social Mixer",
        "location": "Clubhouse D",
        "description": "Social tennis event with food and refreshments",
        "startDate": "2025-07-10T07:00:00.000Z",
        "endDate": "2025-07-16T06:59:59.000Z",
        "registrationDeadline": "2025-07-06T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Rally Rovers"
      },
      {
        "id": 190,
        "name": "Volleyball Night League",
        "location": "Indoor Arena E",
        "description": "Evening volleyball league for club members",
        "startDate": "2025-08-01T07:00:00.000Z",
        "endDate": "2025-08-11T06:59:59.000Z",
        "registrationDeadline": "2025-07-26T06:59:59.000Z",
        "status": "ONGOING",
        "club": "Eclipse Smashers"
      },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="event-container">
      <div className="label-container">
        <h2>Events</h2>
      </div>
      <div className="event-list">
        {eventData.map(event => (
          <div key={event.id} className="event" onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}>
            <div className="event-name">{event.name}</div>
            {expandedEvent === event.id && (
              <div className="event-details">
                <div><strong>Location:</strong> {event.location}</div>
                <div><strong>Description:</strong> {event.description}</div>
                <div><strong>Start Date:</strong> {event.startDate}</div>
                <div><strong>End Date:</strong> {event.endDate}</div>
                <div><strong>Registration Deadline:</strong> {event.registrationDeadline}</div>
                <div><strong>Club:</strong> {event.club}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-button" onClick={togglePopup}>+</div>
      {showPopup && (
        <div className="modal">
          <div className="popup-box">
            <h2>Add Event</h2>
            <form>
            <div style={{display:"flex"}}>
              <div className="input-group">
                <div className="input-column">
                  <label className="label" htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={newEvent.name} onChange={handleChange} />
                </div>
                <div className="input-column">
                  <label className="label" htmlFor="location">Location:</label>
                  <input type="text" id="location" name="location" value={newEvent.location} onChange={handleChange} />
                </div>
                <div className="input-column">
                  <label className="label" htmlFor="startDate">Start Date:</label>
                  <input type="datetime-local" id="startDate" name="startDate" value={newEvent.startDate} onChange={handleChange} />
                </div>
                <div className="input-column">
                  <label className="label" htmlFor="registrationDeadline">Registration Deadline:</label>
                  <input type="datetime-local" id="registrationDeadline" name="registrationDeadline" value={newEvent.registrationDeadline} onChange={handleChange} />
                </div>
              </div>
              <div className="input-group">
                <div className="input-column">
                  <label className="label" htmlFor="description">Description:</label>
                  <textarea id="description" name="description" value={newEvent.description} onChange={handleChange} rows={4} />

                </div>
                <div className="input-column">
                  <label className="label" htmlFor="endDate">End Date:</label>
                  <input type="datetime-local" id="endDate" name="endDate" value={newEvent.endDate} onChange={handleChange} />
                </div>
                <div className="input-column">
                  <label className="label" htmlFor="club">Club:</label>
                  <input type="text" id="club" name="club" value={newEvent.club} onChange={handleChange} />
                </div>
              </div>
              </div>
              <div className="button-container">
                <button className="confirm-button" type="button" onClick={handleConfirm}>Confirm</button>
                <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;