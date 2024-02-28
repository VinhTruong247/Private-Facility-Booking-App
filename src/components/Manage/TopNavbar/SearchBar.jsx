import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./SearchBar.scss";

export default function SearchBar() {
  const handleSearch = () => {
    // Perform search action here
    console.log("Search button clicked or Enter pressed");
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
      <div className="vertical-line"></div>
      <button className="search-icon" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
