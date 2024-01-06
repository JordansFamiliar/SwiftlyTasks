import React from 'react';
import './SidePanel.css';

function SidePanel({ currentPage, navigateTo }) {
  // Define the icons or links for navigation
  const panelItems = [
    { label: 'Home', icon: 'home', page: 'home' },
    { label: 'Profile', icon: 'profile', page: 'profile' },
    { label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
    { label: 'Calendar', icon: 'calendar', page: 'calendar' },
    { label: 'Groups', icon: 'groups', page: 'groups' },
    // Add more items as needed
  ];

  return (
    <div className="side-panel">
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
