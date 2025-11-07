import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTachometerAlt, faLeaf, faShoppingBasket, faCog, faSignOutAlt, 
    faUser, faMapMarkerAlt, faSave, faSyncAlt 
} from '@fortawesome/free-solid-svg-icons';
import "./VendorEditProfile.css"
// Mock user data for initial form state
const mockUserData = {
    fullName: 'Vishav Vara',
    email: 'vishav@example.com',
    phoneNumber: '1234567890',
    city: 'Dharwad',
    stateDistrict: 'Karnataka',
    pincode: '111111',
    landmark: 'IIT'
};

function VendorEditProfile() {
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState(mockUserData);
    // State to hold validation errors
    const [errors, setErrors] = useState({});
    // State to track if form has been submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Update form data on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for the field as user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Basic validation function
    const validate = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.stateDistrict) newErrors.stateDistrict = 'State/District is required';
        if (!formData.pincode) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Pincode must be 6 digits';
        }
        // Landmark is optional, so no validation needed
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // If no errors, proceed with saving data
            console.log('Profile data submitted:', formData);
            alert('Profile changes saved successfully!');
            // Here you would typically make an API call to save the data
            // e.g., saveUserProfile(formData);
        } else {
            console.log('Form has validation errors:', validationErrors);
        }
    };

    // Reset form to initial mock data
    const handleReset = () => {
        setFormData(mockUserData);
        setErrors({});
        setIsSubmitted(false);
        alert('Form reset to original values.');
    };

    const handleLogout = () => {
        navigate('/login'); // Assuming a login route
    };

    return (
        <div className="settings-container">
            {/* --- SIDEBAR --- */}
            <aside className="sidebar-nav">
                <h1 className="sidebar-logo">SmartMandi</h1>
                <p className="vendor-portal-text">Vendor Portal</p>
                <nav className="nav-menu">
                    <a href="/vendor/dashboard" className="nav-item">
                        <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: '10px'}} /> Dashboard
                    </a>
                    <a href="/vendor/browseProducts" className="nav-item">
                        <FontAwesomeIcon icon={faLeaf} style={{marginRight: '10px'}} /> Browse Products
                    </a>
                    <a href="/vendor/orders" className="nav-item">
                        <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight: '10px'}} /> My Orders
                    </a>
                    <a href="/vendor/editProfile" className="nav-item active"> {/* Highlight active page */}
                        <FontAwesomeIcon icon={faCog} style={{marginRight: '10px'}} /> Settings
                    </a>
                    <a href="#" onClick={handleLogout} className="nav-item logout-link">
                        <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}} /> Logout
                    </a>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="settings-main-content">
                <header className="settings-header">
                    <h2>Edit Profile & Address</h2>
                    <p className="settings-subtitle">
                        Update your contact and primary location details.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="profile-form">
                    {/* --- Personal & Contact Details --- */}
                    <div className="form-card">
                        <div className="card-header">
                            <FontAwesomeIcon icon={faUser} className="card-icon" />
                            <h3>Personal & Contact Details</h3>
                        </div>
                        <div className="form-group-full">
                            <label htmlFor="fullName">Full Name *</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={errors.fullName ? 'input-error' : ''}
                            />
                            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                        </div>

                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'input-error' : ''}
                                />
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number *</label>
                                <div className="phone-input-group">
                                    <span className="phone-prefix">+91</span>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={errors.phoneNumber ? 'input-error' : ''}
                                        maxLength="10"
                                    />
                                </div>
                                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                            </div>
                        </div>
                    </div>

                    {/* --- Primary Address --- */}
                    <div className="form-card">
                        <div className="card-header">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="card-icon" />
                            <h3>Primary Address</h3>
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="city">City *</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={errors.city ? 'input-error' : ''}
                                />
                                {errors.city && <p className="error-message">{errors.city}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="stateDistrict">State/District *</label>
                                <input
                                    type="text"
                                    id="stateDistrict"
                                    name="stateDistrict"
                                    value={formData.stateDistrict}
                                    onChange={handleChange}
                                    className={errors.stateDistrict ? 'input-error' : ''}
                                />
                                {errors.stateDistrict && <p className="error-message">{errors.stateDistrict}</p>}
                            </div>
                        </div>

                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode *</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className={errors.pincode ? 'input-error' : ''}
                                    maxLength="6"
                                />
                                {errors.pincode && <p className="error-message">{errors.pincode}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="landmark">Landmark (Optional)</label>
                                <input
                                    type="text"
                                    id="landmark"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="form-actions">
                        <button type="submit" className="save-button">
                            <FontAwesomeIcon icon={faSave} style={{marginRight: '8px'}} /> Save Profile Changes
                        </button>
                        <button type="button" onClick={handleReset} className="reset-button">
                            <FontAwesomeIcon icon={faSyncAlt} style={{marginRight: '8px'}} /> Reset Form
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default VendorEditProfile;