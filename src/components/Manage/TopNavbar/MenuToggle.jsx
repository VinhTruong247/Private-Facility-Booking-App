// MenuToggle.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import './MenuToggle.scss';

export default function MenuToggle({ isOpen, toggleMenu }) {
    return (
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
          {/* Dropdown menu content */}
          <button className="home-button" onClick={() => window.location.href = '/'}> {/* Home button */}
            <FontAwesomeIcon icon={faHome} />
            Home
          </button>
        </div>
      </div>
    );
}
