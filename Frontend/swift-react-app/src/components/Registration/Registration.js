import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import { fetchData } from '../utils';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function Registration() {
  const [csrftoken, setCsrftoken] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    const fetchDataEffect = async () => {
      const token = await fetchData();
      setCsrftoken(token);
    };
    fetchDataEffect();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleRegistration = useCallback(async () => {
    try {
      if (!csrftoken || csrftoken === '') {
	return;
      }
      setButtonPressed(true);
      if (!username || !email || !password) {
        setError('Please fill in all required fields.');
        return;
      }

      const response = await fetch('https://swiftly-tasks.vercel.app/swiftlytasks/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
	  'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ username, email, password }),
	credentials: 'include'
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log('Registration successful');
	navigate('/swiftlytasks/login/');
      } else {
        console.error('Registration failed');
        setError(responseData.message);
      }
    } catch (error) {
      console.error('An error occurred during registration', error);
      setError('An unexpected error occurred');
    }
  }, [csrftoken, username, email, password, navigate]);

  return (
    <main>
      <section id="center-column">
        <div className="form-container">
          <h2>Register Account</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form className="form">
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              variant="outlined"
              margin="normal"
              fullWidth={true}
	      required
            />
            {buttonPressed && username === '' && (
              <p style={{ color: 'red' }}>Username is required.</p>
            )}
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              margin="normal"
              fullWidth={true}
	      required
            />
            {buttonPressed && email === '' && (
              <p style={{ color: 'red' }}>Email is required.</p>
            )}
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              margin="normal"
              fullWidth={true}
	      required
            />
            {buttonPressed && password === '' && (
              <p style={{ color: 'red' }}>Password is required.</p>
            )}
            <Button
              variant="contained"
              style={{ backgroundColor: '#000000' }}
              onClick={handleRegistration}
              fullWidth={true}
            >
              Register
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Registration;
