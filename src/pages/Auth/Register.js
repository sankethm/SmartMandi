import React from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  return (
    <div style={{maxWidth:520, margin:'40px auto', padding:24, background:'#fff', borderRadius:8}}>
      <h3>Register (mock)</h3>
      <p>Registration form placeholder.</p>
      <button onClick={()=>navigate('/')}>Back</button>
    </div>
  );
};
export default Register;