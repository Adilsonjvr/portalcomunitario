import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={loginHandler} className="login-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="email"
                    placeholder="Email"
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
                <button type="submit">Login</button>
                <button type="button" className="toggle-button" onClick={() => navigate('/register')}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
