import styles from './login.module.css';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

export default function LoginForm({ closeClick }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const csrftoken = Cookies.get('csrftoken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            console.log("Login OK.")
            window.location.reload();
        } else {
            console.log("Login Error");
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
                <h1>Log In</h1>
                <p>Username:</p>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type='text' />
                <p>Password:</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
                <button>Log In</button>
            </form>
        </div>
    );
}
