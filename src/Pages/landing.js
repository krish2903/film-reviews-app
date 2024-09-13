import React, { useEffect, useState } from 'react';
import styles from "./landing.module.css";
import Nav from "../Components/nav.js";
import MovieGrid from '../Components/movieGrid.js';
import Footer from '../Components/footer.js';
import LoginForm from '../Components/login.js';
import SignUpForm from '../Components/signup.js';

function MainHome() {
    document.title = "Landing Page";

    const [navOption, setNavOption] = useState('');

    useEffect(() => {
        if (navOption != '') { document.body.style.overflow = 'hidden';}
        else { document.body.style.overflow = '';}
    }, [navOption]);

    const handleNavOption = (data) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setNavOption(data);
    };

    return (
        <>
            <Nav buttonClick={handleNavOption} />
            {navOption == 'logIn' ? <LoginForm closeClick={handleNavOption} /> : navOption == 'signUp' ? <SignUpForm closeClick={handleNavOption} /> : ''}
            <div className={styles.heading}>
                <h1 className={styles.title}>Browse Our <span>Latest Movies</span> Now</h1>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search for a movie you are looking for" autoCorrect='on' />
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF">
                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        <path fill="none" d="M0 0h24v24H0z" />
                    </svg>
                </div>
            </div>
            <div className={styles.movieGrid}>
                <MovieGrid />
            </div>
            <Footer />
        </>
    );
}

export default MainHome;
