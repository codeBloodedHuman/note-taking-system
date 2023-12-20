// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Add your registration logic here, for example, send a request to an authentication API
    console.log('Register button clicked');
    console.log('User Name:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    axios.post(`https://notes-backend-system.onrender.com/user/register`, { username, email, password})
    .then(() => console.log('logged in'))
    .catch(err => {
      console.error(err);
      if (err.response && err.response.status === 400) {
        console.log('Bad Request. Server expects the following fields:', err.response.data);
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
