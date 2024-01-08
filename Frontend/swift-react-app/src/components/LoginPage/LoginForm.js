import React, { useState } from 'react';
import { TextField, Button } from "@mui/material';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successful login, you might want to redirect or perform other actions
        console.log('Login successful');
      } else {
      // Handle authentication failure
      console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login', error);
    }
  };


  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form className="login-form">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          margin="normal"
          fullwidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleSignIn} fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
