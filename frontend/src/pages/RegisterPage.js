import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending registration request...');
            const response = await axios.post('/api/users/register', { name, email, password });
            console.log('Registration successful:', response);
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error.response);
            setError(error.response.data.error || 'Registration failed.');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={registerHandler} className="register-form">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <button type="button" className="toggle-button" onClick={() => navigate('/')}>
                    Back to Login
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
