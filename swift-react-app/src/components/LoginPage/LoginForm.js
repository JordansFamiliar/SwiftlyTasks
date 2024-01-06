import React, { useState } from 'react';

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
    <div>
      <h2>Login to Your Account</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
