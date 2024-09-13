import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./movieDetails.module.css";
import Nav from "../Components/nav.js";
import Footer from '../Components/footer.js';
import LoginForm from '../Components/login.js';
import SignUpForm from '../Components/signup.js';
import StarRating from '../Components/starRating.js';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [navOption, setNavOption] = useState('');
    
    useEffect(() => {
        if (navOption != '') { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = ''; }
    }, [navOption]);

    const handleNavOption = (data) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setNavOption(data);
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/movies/${id}/`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) { return '' } 

    return (
        <>
            <Nav buttonClick={handleNavOption} />
            {navOption == 'logIn' ? <LoginForm closeClick={handleNavOption} /> : navOption == 'signUp' ? <SignUpForm closeClick={handleNavOption} /> : ''}
            <div className={styles.movieContainer}>
                <div className={styles.imgContainer}>
                    <img src={movie.image} alt={movie.title} />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <span>Watch Trailer</span>
                    </button>
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.descContainer}>
                        <h1>{movie.title}</h1>
                        <div className={styles.ratingContainer}>
                            <StarRating rating={movie.rating} />
                            <p>{parseFloat(movie.rating).toFixed(1)}<span> /10</span></p>
                            <p><b>0 review(s)</b></p>
                        </div>
                        <p>{movie.description}</p>
                    </div>
                    <h2>User Reviews</h2>
                    <p>No reviews as of now.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MovieDetails;
