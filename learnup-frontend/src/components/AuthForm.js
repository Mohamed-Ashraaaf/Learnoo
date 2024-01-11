import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Make a login API call
        const loginResponse = await axios.post('/api/login', {
          email,
          password,
        });
        // Handle login success, e.g., set token in local storage, redirect, etc.
        console.log('Login successful:', loginResponse.data);
      } else {
        // Make a register API call
        const registerResponse = await axios.post('/api/register', {
          email,
          password,
        });
        // Handle registration success, e.g., redirect to login, display success message, etc.
        console.log('Registration successful:', registerResponse.data);
      }
    } catch (error) {
      // Handle API call errors, e.g., show error messages, log errors, etc.
      console.error('API Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to register?' : 'Already registered? Login'}
      </p>
    </form>
  );
};

export default AuthForm;
