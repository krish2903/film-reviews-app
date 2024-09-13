import { Link, useNavigate } from 'react-router-dom';
import styles from './nav.module.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Navbar({ buttonClick }) {
    const [clickValue, setClickValue] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleButtonClick = (e) => {
        setClickValue(e.target.value);
        buttonClick(e.target.value);
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                credentials: 'include',
            });

            if (response.ok) {
                Cookies.remove('csrftoken');
                Cookies.remove('sessionid');
                localStorage.removeItem('authToken');
                window.location.reload();
                console.log(isLoggedIn);
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/auth/status/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(data.isAuthenticated);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Failed to check login status:", error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <nav id="navbar" className={styles.navbar}>
            <ul className={styles.navContainer}>
                <div className={styles.navElement}>
                    <Link className={styles.navLink}>
                        <p className={styles.navText} href="/">YOUR LOGO</p>
                    </Link>
                </div>
                <div className={styles.loginContainer}>
                    {!isLoggedIn ? (
                        <>
                            <div className={styles.navElement}>
                                <Link className={styles.navLink}>
                                    <button value='logIn' onClick={handleButtonClick} id={styles.loginButton} className={styles.navText} href="/">Log In</button>
                                </Link>
                            </div>
                            <div className={styles.navElement}>
                                <Link className={styles.navLink}>
                                    <button value='signUp' onClick={handleButtonClick} id={styles.signinButton} className={styles.navText} href="/">Sign Up</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.navElement}>
                                <Link className={styles.navLink}>
                                    <button value='logOut' onClick={handleLogout} id={styles.logoutButton} className={styles.navText} href="/">Logout</button>
                                </Link>
                            </div>
                        </>
                    )

                    }
                </div>
            </ul>
        </nav>
    );
}
