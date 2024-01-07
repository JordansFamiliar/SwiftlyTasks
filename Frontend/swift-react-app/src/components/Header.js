import React, { useState } from 'react';
import { IconButton, Popover, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';
import './PopoverStyles.css';

function Header({ isLoggedIn }) {
  const [anchorE1, setAnchorE1] = useState(null);
  const [notifications, setNotifications] = useState([]); // Add this line to declare the notifications state

  const handleIconClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const open = Boolean(anchorE1);

  // Simulate fetching notifications from an API
  // You should replace this with actual API call or data fetching logic
  // Ensure that the 'notifications' state is updated with the fetched data

  return (
    <div className="header">
      <h1>SWIFTLY TASKS</h1>
      {isLoggedIn ? (
        <div className="notification-icon">
          <IconButton onClick={handleIconClick} color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Popover
            open={open}
            anchorE1={anchorE1}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div style={{ padding: '10px' }}>
              {notifications.map((notification) => (
                <p key={notification.id}>{notification.message}</p>
              ))}
              {notifications.length === 0 && <p>No notifications</p>}
            </div>
          </Popover>
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
