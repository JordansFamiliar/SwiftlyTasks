import React, { useState, useEffect } from 'react';
import { IconButton, Popover, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';
import './PopoverStyles.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils';
import { useAuth } from '../AuthContext';

function Header() {
  const csrftoken = getCookie('csrftoken');
  const [anchorE1, setAnchorE1] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications or any other data needed for the header
    // You can add your fetch logic here

    // For now, let's assume an empty array for notifications
    setNotifications([]);
  }, [authenticated]);

  const handleIconClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const open = Boolean(anchorE1);

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:8000/swiftlytasks/logout/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
      });

      if (response.ok) {
        logout();
        navigate('/swiftlytasks/login/');
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  return (
    <div className="header">
      <h1>SWIFTLY TASKS</h1>
      {authenticated && (
        <div className="notification-icon">
          <IconButton onClick={handleIconClick} color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorE1}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              className: 'popover-paper',
            }}
          >
            <div style={{ padding: '10px' }}>
              {notifications.map((notification) => (
                <p key={notification.id}>{notification.message}</p>
              ))}
              {notifications.length === 0 && <p>No notifications</p>}
            </div>
          </Popover>
        </div>
      )}
      <div className="auth-buttons">
        {authenticated ? (
	  <React.Fragment>
            <Button variant="contained" color="primary" onClick={handleSignOut} className="button">
              Logout
            </Button>
	  </React.Fragment>
        ) : (
	  <React.Fragment>
            <Button variant="contained" color="primary" onClick={() => navigate('/swiftlytasks/login/')} className="button">
              Sign In
            </Button>
	    <Button variant="contained" color="primary" onClick={() => navigate('/swiftlytasks/register/')} className="button">
	      Sign Up
	    </Button>
	  </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Header;
