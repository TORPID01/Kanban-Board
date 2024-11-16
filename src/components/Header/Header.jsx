import React, { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react';
import { useCardContext } from '../../StoreContext/Contex';
import './Header.css'


export function Header() {
  const { category, setCategory, sortBy, setSortBy } = useCardContext();
  const [isOpen, setIsOpen] = useState(false);

  // References for button and dropdown
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown if the click is outside the button or dropdown
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div style={{ position: 'relative' }}>
          <button
            onClick={toggleDropdown}
            className="display-button"
            ref={buttonRef} // Set reference to the button
          >
            <SlidersHorizontal size={16} />
            <span>Display</span>
          </button>

          {isOpen && (
            <div className="dropdown" ref={dropdownRef}> {/* Set reference to the dropdown */}
              <div className="dropdown-group">
                <label className="dropdown-label">
                  Grouping
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="Status">Status</option>
                  <option value="Users">User</option>
                  <option value="Priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-group">
                <label className="dropdown-label">
                  Ordering
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="Priority">Priority</option>
                  <option value="Title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
