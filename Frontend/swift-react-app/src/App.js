import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginPage';
import HomePage from './components/HomePage'; //landing page
import ProfilePage from './components/ProfilePage';
import DashBoard from './components/DashBoard';
import './App.css';

function App() {
  // Use state to track the current page
  const [currentPage, setCurrentPage] = useState('home');

  // Function to switch between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'dashboard':
        return <DashBoard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Header navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
