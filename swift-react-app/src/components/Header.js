import React from 'react';
import { Button } from '@mui/material';
import './Header.css';

function Header({ isLoggedIn }) {
  return (
    <div className="header">
      <h1>SWIFTLY TASKS</h1>
      {isLoggedIn ? (
        <div className="notification-icon">
          <img src="notification-icon.svg" alt="Notification" />
          <span className="notification-counter">3</span>
        </div>
      ) : (
        <div className="auth-buttons">
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </div>
       )}
  </div>
  );
}

export default Header;
