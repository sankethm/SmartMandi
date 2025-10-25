
import React, { useState } from 'react';
import './SelectLogin.css';
// Assume you'd import the illustration image here in a real project
// import illustration from './path/to/illustration.png';

const SelectLogin = () => {
    // State to handle loading or submission status (example of a hook)
    const [isLoading, setIsLoading] = useState(false);

    // Basic 'validation' or handling for button clicks
    const handleLogin = (role) => {
        setIsLoading(true);
        console.log(`Attempting to log in as ${role}...`);
        
        // Simulate an API call or navigation delay
        setTimeout(() => {
            setIsLoading(false);
            // *** In a real app, you would use:
            // navigate(`/${role}-dashboard`); 
            console.log(`Navigating to ${role} dashboard.`);
        }, 1500);
    };

    const handleRegister = () => {
        console.log("Navigating to registration page...");
        // *** In a real app, you would use:
        // navigate('/register');
    };

    const handleForgotPassword = () => {
        console.log("Navigating to forgot password page...");
        // *** In a real app, you would use:
        // navigate('/forgot-password');
    };

    return (
        <div className="landing-page">
            <header className="navbar">
                <div className="logo">SmartMandi</div>
                <nav className="nav-links">
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
                <div className="contact-icons">
                    <span>📞</span>
                    <span>📧</span>
                </div>
            </header>

            <main className="content-container">
                <div className="login-form-section">
                    <h1 className="welcome-title">Welcome to SmartMandi</h1>
                    <p className="subtitle">
                        Connecting farmers and vendors for a better agricultural future.
                    </p>

                    <h2 className="choice-title">Choose Your Login Type</h2>
                    <p className="choice-subtitle">
                        Select your role to access your dashboard
                    </p>

                    {/* Farmer Login Card */}
                    <div className="role-card farmer-card">
                        <div className="role-header">
                            <span className="icon">🌱</span>
                            <span className="role-text">Farmer Login</span>
                        </div>
                        <p className="role-description">Access your farm dashboard and marketplace</p>
                        <button
                            className="login-button farmer-button"
                            onClick={() => handleLogin('farmer')}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : '→ Login as Farmer'}
                        </button>
                    </div>

                    {/* Vendor Login Card */}
                    <div className="role-card vendor-card">
                        <div className="role-header">
                            <span className="icon">🛒</span>
                            <span className="role-text">Vendor Login</span>
                        </div>
                        <p className="role-description">Manage your products and orders</p>
                        <button
                            className="login-button vendor-button"
                            onClick={() => handleLogin('vendor')}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : '→ Login as Vendor'}
                        </button>
                    </div>

                    <p className="register-or-text">Or</p>
                    <p className="register-new-text">New to SmartMandi?</p>

                    {/* Register Button */}
                    <button
                        className="register-button"
                        onClick={handleRegister}
                        disabled={isLoading}
                    >
                        + Register New Account
                    </button>

                    {/* Forgot Password Link */}
                    <button 
                        className="forgot-password-link"
                        onClick={handleForgotPassword}
                        disabled={isLoading}
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Illustration Section (Right side) */}
                <div className="illustration-section">
                    {/* In a real project, this would be an <img> tag */}
                    <div className="illustration-placeholder">
                        {/* Placeholder for the image of the two men with vegetables */}
                                            </div>
                </div>
            </main>
        </div>
    );
};

export default SelectLogin;