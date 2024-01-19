import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginPage/LoginForm';
import Registration from './components/Registration/Registration';
import Dashboard from './components/DashBoard/DashBoard';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import EditTaskForm from './components/AddTaskForm/EditTaskForm';
import './App.css';

function App() {
  const [pageHeading, setPageHeading] = useState('');
  const [tasks, setTasks] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const updateTasks = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Router>
      <div className="app-container" style={{ backgroundColor: '#333', margin: 0, padding: 0 }}>
        <Header />
        <div className="heading-container">
          <h1>{pageHeading}</h1>
	</div>
        <main>
          <section id="left-column">
	  </section>
	  <section id="center-column">
              <Routes>
                <Route path="/swiftlytasks/login" element={<LoginForm onLogin={handleLogin} setPageHeading={setPageHeading} />} />
	        <Route path="/swiftlytasks/register" element={<Registration setPageHeading={setPageHeading} />} />
	        <Route path="/swiftlytasks/dashboard" element={<Dashboard setPageHeading={setPageHeading} />} />
	        <Route path="/swiftlytasks/add_task" element={<AddTaskForm updateTasks={updateTasks} setPageHeading={setPageHeading} />} />
              </Routes>
          </section>
          <section id="right-column">
	  </section>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

