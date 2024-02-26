import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function MenuToggle({ isOpen, toggleMenu }) {
    return (
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
        {isOpen && (
          <div className="dropdown">
            {/* Dropdown menu content */}
            <p>Dropdown Menu Content</p>
          </div>
        )}
      </div>
    );
}
