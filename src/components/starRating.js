import React, { useState } from "react";

const StarRating = ({ rating, onMouseOver, onClick, isInteractive = false }) => {
    const [hoveredRating, setHoveredRating] = useState(null);
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="star-rating">
            {stars.map(star => (
                <span
                    key={star}
                    className={`star ${(hoveredRating !== null ? star <= hoveredRating : star <= rating) ? 'filled' : ''}`}
                    onMouseEnter={() => isInteractive && setHoveredRating(star)}
                    onMouseLeave={() => isInteractive && setHoveredRating(null)}
                    onClick={() => isInteractive && onClick(star)}
                >
                    ★ 
                </span>
            ))}
        </div>
    );
};

export default StarRating;
