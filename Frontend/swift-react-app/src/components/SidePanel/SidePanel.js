import React, { useState, useEffect } from 'react';
import './SidePanel.css';
import CalendarIcon from './icons/calendar.svg';
import DashboardIcon from './icons/dashboard.svg';
import GroupsIcon from './icons/groups.svg';
import HomeIcon from './icons/home.svg';
import ProfileIcon from './icons/profile.svg';

function SidePanel({ currentPage, navigateTo }) {
  const [isPanelVisible, setPanelVisibility] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursorX = e.clientX;

      // Adjust threshold for how close the cursor should be to the left edge
      const threshold = 20;

      if (cursorX <= threshold) {
        setPanelVisibility(true);
      } else {
        setPanelVisibility(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    setPanelVisibility(true);
  };

  const handleMouseLeave = () => {
    setPanelVisibility(false);
  };

  // Define the icons or links for navigation
  const panelItems = [
    { label: 'Home', icon: HomeIcon, page: 'home' },
    { label: 'Profile', icon: ProfileIcon, page: 'profile' },
    { label: 'Dashboard', icon: DashboardIcon, page: 'dashboard' },
    { label: 'Calendar', icon: CalendarIcon, page: 'calendar' },
    { label: 'Groups', icon: GroupsIcon, page: 'groups' },
    // Add more items as needed
  ];

  return (
    <div
      className={`side-panel${isPanelVisible ? ' visible' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {panelItems.map((item) => (
        <div
          key={item.label}
          className={`side-panel-icon${currentPage === item.page ? ' active' : ''}`}
          onClick={() => navigateTo(item.page)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default SidePanel;
