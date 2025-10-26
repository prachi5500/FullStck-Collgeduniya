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
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'50px' }}>
      <h2 style={{fontFamily:'ariel', fontWeight:'bold', fontSize:'1.7rem'}}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px',}}><input style={{ padding:'7px 20px',borderRadius:'5px', backgroundColor:'white', color:'black',fontSize:'1rem'}}
          type="password" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        /></div>
        <div style={{display:'flex', justifyContent:'center',}}><button type="submit" style={{padding:'7px 20px', backgroundColor:'#f16b11eb', border:'none', borderRadius:'4px',
          color:'white',  cursor:'pointer', marginTop:'20px', marginBottom:'20px'
        }}>Login</button></div>
      </form>
    </div>
  );
}

export default AdminLogin;