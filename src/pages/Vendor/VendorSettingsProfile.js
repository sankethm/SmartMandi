import React, { useState } from 'react';
import styles from './VendorSettingsProfile.module.css';

const VendorSettingsProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Vishw Vora',
    shopName: 'Vishw Grocery',
    email: 'vishw@example.com',
    phone: '+91 9876543210',
    city: 'Pune',
  });

  const handleChange = (e) => setProfile({...profile, [e.target.name]: e.target.value});
  const handleSave = (e) => { e.preventDefault(); alert('Profile saved (mock)'); };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vendor Profile</h1>
      <form className={styles.form} onSubmit={handleSave}>
        <label>Name</label><input name="name" value={profile.name} onChange={handleChange} />
        <label>Shop Name</label><input name="shopName" value={profile.shopName} onChange={handleChange} />
        <label>Email</label><input name="email" value={profile.email} onChange={handleChange} />
        <label>Phone</label><input name="phone" value={profile.phone} onChange={handleChange} />
        <label>City</label><input name="city" value={profile.city} onChange={handleChange} />
        <div className={styles.actions}><button type="button" onClick={()=>setProfile({name:'Vishw Vora',shopName:'Vishw Grocery',email:'vishw@example.com',phone:'+91 9876543210',city:'Pune'})}>Reset</button><button type="submit">Save</button></div>
      </form>
    </div>
  );
};

export default VendorSettingsProfile;