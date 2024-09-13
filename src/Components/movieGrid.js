import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './movieGrid.module.css';

export default function MovieGrid() {
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState('title-asc');

    useEffect(() => {
        fetchMovies();
    }, [sortOption]);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/movies/');
            const data = await response.json();
            const sortedMovies = sortMovies(data);
            setMovies(sortedMovies);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const sortMovies = (movies) => {
        switch (sortOption) {
            case 'title-asc':
                return movies.sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return movies.sort((a, b) => b.title.localeCompare(a.title));
            case 'rating-asc':
                return movies.sort((a, b) => a.rating - b.rating);
            case 'rating-desc':
                return movies.sort((a, b) => b.rating - a.rating);
            default:
                return movies;
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <>
            <div className={styles.filterBar}>
                <p>Found <span>1,608 movies</span> in total</p>
                <select onChange={handleSortChange} value={sortOption}>
                    <option value="title-asc">A-Z</option>
                    <option value="title-desc">Z-A</option>
                    <option value="rating-asc">Rating Descending</option>
                    <option value="rating-desc">Rating Ascending</option>
                </select>
            </div>
            <div className={styles.movieGrid}>
                {movies.map(movie => (
                    <Link key={movie.id} className={styles.movieItem} to={`/movies/${movie.id}/`}>
                        <div className={styles.movieImg}>
                            <img alt={movie.title} src={movie.image} />
                            <div className={styles.overlay}>
                                <div className={styles.moreInfoButton}>
                                    <p>Read More</p>
                                </div>
                            </div>
                        </div>
                        <p className={styles.movieTitle}>{movie.title}</p>
                        <div className={styles.review}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" fill="#f5b50a">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </svg>
                            <p>{parseFloat(movie.rating).toFixed(1)}<span> /10</span></p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
