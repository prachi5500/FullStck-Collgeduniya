import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.username === username && savedUser.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Logged in successfully!');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-form">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="admin-submit-btn">Login</button>
      </form>
      <p>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default UserLogin;