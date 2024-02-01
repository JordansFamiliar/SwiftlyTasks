import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { fetchData } from '../utils';
import './LoginForm.css';

function LoginForm() {
  const { login } = useAuth();
  const [csrftoken, setCsrftoken] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleSignIn = useCallback(async () => {
    try {
      if (!csrftoken) {
	return;
      }

      if (!email || !password) {
        setError('Please fill in all required fields.');
        return;
      }

      const signInResponse = await fetch('https://swiftly-tasks.vercel.app/swiftlytasks/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const responseData = await signInResponse.json();

      if (responseData.success) {
        console.log('Login successful');
        login();
        navigate('/swiftlytasks/dashboard/');
        setError('');
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      console.error('An error occurred during login', error);
      setError('An unexpected error occurred');
    }
  }, [csrftoken, email, password, login, navigate]);

  useEffect(() => {
    const fetchDataEffect = async () => {
      const token = await fetchData();
      setCsrftoken(token);
    };
    fetchDataEffect();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleButtonPressed = () => {
    setButtonPressed(true)
    handleSignIn()
  }

  return (
    <main>
      <section id="center-column">
        <div className="form-container">
          <h2>Login to Your Account</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form className="form">
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
              <p style={{ color: 'red' }}>*Email is required.</p>
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
              <p style={{ color: 'red' }}>*Password is required.</p>
            )}
            <Button
              variant="contained"
              style={{ backgroundColor: '#000000' }}
              onClick={handleButtonPressed}
              fullWidth={true}
            >
              Sign In
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginForm;
