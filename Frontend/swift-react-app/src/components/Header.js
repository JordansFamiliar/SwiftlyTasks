import React, { useState, useEffect } from 'react';
import { IconButton, Popover, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';
import './PopoverStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from 'utils';
import { useAuth } from '../AuthContext';

function Header() {
  const [csrftoken, setCsrftoken] = useState('');
  const [anchorE1, setAnchorE1] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications or any other data needed for the header
    // Add fetch logic here

    //Assume an empty array for notifications
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

      await fetchDataEffect();

      const response = await fetch('https://swiftly-tasks.vercel.app/swiftlytasks/logout/', {
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

  useEffect(() => {
    const fetchDataEffect = async () => {
      const token = await fetchData();
      setCsrftoken(token);
    };

  // Call fetchDataEffect when component mounts
    fetchDataEffect();
  }, []);

  return (
    <div className="header">
      <h1><Link to="/swiftlytasks">SWIFTLY TASKS</Link></h1>
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
