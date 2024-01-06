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

  const handleSignIn = () => {
    // Add logic to handle the sign-in action (e.g., send a request to the backend)
    console.log('Sign in clicked');
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
