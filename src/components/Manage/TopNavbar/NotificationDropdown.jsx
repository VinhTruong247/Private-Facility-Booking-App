import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import "./NotificationDropdown.scss";

export default function NotificationDropdown({ isOpen, toggleNotification }) {
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen) {
      const buttonRect = dropdownRef.current.getBoundingClientRect();
      const { innerWidth } = window;

      // Calculate position to ensure the dropdown stays within the viewport
      let right = buttonRect.right;
      if (innerWidth - buttonRect.right < buttonRect.right) {
        right = innerWidth - buttonRect.right;
      }

      setDropdownPosition({ top: buttonRect.bottom, right });
    }
  }, [isOpen]);

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <FontAwesomeIcon icon={faBell} onClick={toggleNotification} />
      {isOpen && (
        <div className="dropdown" style={{ top: dropdownPosition.top, right: dropdownPosition.right }}>
          {/* Notification dropdown content */}
          <p>Notification Dropdown Content</p>
        </div>
      )}
    </div>
  );
}
