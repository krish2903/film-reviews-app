import styles from './login.module.css';
import React, { useState } from 'react';

export default function SignUpForm({ closeClick }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Passwords do not match.");
            return;
        }

        const userData = {
            username,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log("User registered successfully");
            } else {
                const data = await response.json();
                // setError(data.error || "An error occurred during sign-up.");
                console.log(data.error || "An error occurred during sign-up.");
            }
        } catch (err) {
            // setError("An error occurred during sign-up.");
            console.log("An error occurred during sign-up.");
        }
    };

    const handleCloseClick = (e) => {
        closeClick('');
    };

    return (
        <div className={styles.container}>
            <form className={styles.loginContainer} onSubmit={handleSubmit}>
                <svg onClick={handleCloseClick} className={styles.closeButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1e1e1e">
                    <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.7a1 1 0 00-1.41 1.41l4.88 4.89-4.88 4.88a1 1 0 101.41 1.42L12 13.42l4.88 4.88a1 1 0 001.42-1.41l-4.89-4.88 4.89-4.88a1 1 0 000-1.42z" />
                </svg>
                <h1>Sign Up</h1>
                <p>Username:</p>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type='text' />
                <p>Email:</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' />
                <p>Password:</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
                <p>Confirm Password:</p>
                <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type='password' />
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                <button>Sign Up</button>
            </form>
        </div>
    );
}
