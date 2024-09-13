import React from 'react';

const StarRating = ({ rating }) => {

    const FilledStar = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" fill="#f5b50a" stroke='#f5b50a'>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
    );

    const EmptyStar = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" fill="none" stroke='#828f9c'>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
    );

    const roundedRating = Math.floor(rating);

    const stars = Array(10).fill(null).map((_, index) => (
        index < roundedRating ? <FilledStar key={index} /> : <EmptyStar key={index} />
    ));

    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {stars}
        </div>
    );
};

export default StarRating;
