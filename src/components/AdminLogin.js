import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColleges } from '../App';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const { setIsAdminLoggedIn } = useColleges();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div>
      <h2>👤Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="password" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;