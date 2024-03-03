import React, { useState, useEffect } from 'react';
import "./BookingStyle.scss"

function BookingPage(props) {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const facilitiesData = [
      { id: 1, name: 'Basketball Court', location: 'Central Park' },
      { id: 2, name: 'Meeting Room', location: 'Main Office' },
      { id: 3, name: 'Conference Room', location: 'Building A' },
    ];
    setFacilities(facilitiesData);
  }, []);

  const handleFacilityChange = (event) => {
    setSelectedFacility(facilities.find((facility) => facility.id === parseInt(event.target.value)));
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Booking submitted for facility ${selectedFacility.name} on ${selectedDate.toLocaleDateString()}`);
  };

  return (
    <div className="booking-container">
      <h1>Book a Facility</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="facility">Select Facility:</label>
        <select id="facility" name="facility" value={selectedFacility?.id || ''} onChange={handleFacilityChange}>
          <option value="">-- Select Facility --</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.id}>
              {facility.name} ({facility.location})
            </option>
          ))}
        </select>

        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" name="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />

        <button type="submit">Book</button>
      </form>

      {selectedFacility && (
        <div className="facility-details">
          <h2>Selected Facility Details</h2>
          <p>Name: {selectedFacility.name}</p>
          <p>Location: {selectedFacility.location}</p>
        </div>
      )}
    </div>
  );
}

export default BookingPage;