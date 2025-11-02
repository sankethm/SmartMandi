import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './SettingsProfile.module.css';

const FarmerSettingsProfile = () => {
  const { userInfo } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: userInfo?.name || 'Sanket Hiremath',
    email: userInfo?.email || 'sanket@example.com',
    phoneNumber: '+91 1234567890',
    city: 'Dharwad',
    stateDistrict: 'Karnatak',
    pincode: '111111',
    landmark: 'IIT',
    accountHolder: userInfo?.name || 'Sanket Hiremath',
    accountNumber: '1234567890123',
    ifscCode: 'SBIN0000000',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API call to save profile changes
    console.log('Saving profile:', profileData);
    alert('Profile changes saved successfully!');
  };

  const handleReset = () => {
    // Reload initial data or reset form
    setProfileData({
        fullName: 'Sanket Hiremath', email: 'sanket@example.com', phoneNumber: '+91 1234567890',
        city: 'Dharwad', stateDistrict: 'Karnatak', pincode: '111111', landmark: 'IIT',
        accountHolder: 'Sanket Hiremath', accountNumber: '1234567890123', ifscCode: 'SBIN0000000',
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>SmartMandi</h1>
      <h2 className={styles.title}>Edit Profile & Address</h2>
      <p className={styles.subtitle}>Update your contact and primary location details.</p>

      <form className={styles.form} onSubmit={handleSave}>
        <h3 className={styles.sectionTitle}>Personal & Contact Details</h3>
        <label className={styles.label}>Full Name</label>
        <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} />

        <label className={styles.label}>Email Address*</label>
        <input type="email" name="email" value={profileData.email} onChange={handleChange} required />
        
        <label className={styles.label}>Phone Number *</label>
        <input type="tel" name="phoneNumber" value={profileData.phoneNumber} onChange={handleChange} required />

        <h3 className={styles.sectionTitle}>Primary Address</h3>
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>City</label>
                <input type="text" name="city" value={profileData.city} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>State/District</label>
                <input type="text" name="stateDistrict" value={profileData.stateDistrict} onChange={handleChange} />
            </div>
        </div>

        <label className={styles.label}>Pincode</label>
        <input type="text" name="pincode" value={profileData.pincode} onChange={handleChange} />
        
        <label className={styles.label}>Landmark (Optional)</label>
        <input type="text" name="landmark" value={profileData.landmark} onChange={handleChange} />

        <h3 className={styles.sectionTitle}>Banking Information (Mandatory for Payouts)</h3>
        <p className={styles.bankTip}>This information is strictly confidential and **required** to receive payments from SmartMandi for your sales</p>
        
        <label className={styles.label}>Account Holder Name</label>
        <input type="text" name="accountHolder" value={profileData.accountHolder} onChange={handleChange} />

        <label className={styles.label}>Account Number*</label>
        <input type="text" name="accountNumber" value={profileData.accountNumber} onChange={handleChange} required />

        <label className={styles.label}>IFSC Code</label>
        <input type="text" name="ifscCode" value={profileData.ifscCode} onChange={handleChange} />
        
        <div className={styles.buttonActions}>
            <button type="button" className={styles.resetButton} onClick={handleReset}>Reset Form</button>
            <button type="submit" className={styles.saveButton}>Save Profile Changes</button>
        </div>
      </form>
    </div>
  );
};

export default FarmerSettingsProfile;

