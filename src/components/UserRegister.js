import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ username, email, password }));
    alert('Registered successfully! Now login.');
    navigate('/login');
  };

  return (
    <div className="register-form">
      <h2>User Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="admin-submit-btn">Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default UserRegister;