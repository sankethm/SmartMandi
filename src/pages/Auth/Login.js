import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handle = (e) => {
    e.preventDefault();
    const formatted = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Farmer';
    login(formatted, email || `${formatted.toLowerCase()}@example.com`);
    navigate(`/${formatted.toLowerCase()}/dashboard`);
  };

  return (
    <div style={{maxWidth:420, margin:'40px auto', padding:24, background:'#fff', borderRadius:8}}>
      <h3>Login as {role}</h3>
      <form onSubmit={handle}>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <div style={{marginTop:12}}><button type="submit">Login</button></div>
      </form>
    </div>
  );
};
export default Login;