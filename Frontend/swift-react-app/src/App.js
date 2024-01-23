import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginPage/LoginForm';
import Registration from './components/Registration/Registration';
import Dashboard from './components/DashBoard/DashBoard';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import HomePage from './components/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ backgroundColor: '#333', margin: 0, padding: 0 }}>
        <Header />
          <Routes>
            <Route path="/swiftlytasks/login" element={<LoginForm />} />
	    <Route path="/swiftlytasks/register" element={<Registration />} />
	    <Route path="/swiftlytasks/dashboard" element={<Dashboard />} />
	    <Route path="/swiftlytasks/add_task" element={<AddTaskForm />} />
	    <Route path="/swiftlytasks" element={<HomePage />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

