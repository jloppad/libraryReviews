import React from "react";
import StarRating from "./starRating";

const BookDetail = ({ book, username, userRating, handleRating, renderMainImage, images, handleImageClick }) => {
    return (
        <div className="item-container">
            <div className="image-container">
                <div className="main-image">
                    {renderMainImage()}
                </div>
                <div className="thumbnail-container">
                    {images.slice(1, 3).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className="thumbnail"
                            onClick={() => handleImageClick(img)}
                        />
                    ))}
                </div>
            </div>

            <div className="book-details">
                <h2>{book.title}</h2>
                <div className="book-property"><p><strong>Author:</strong> {book.author}</p></div>
                <div className="book-property"><p><strong>Description:</strong> {book.intro}</p></div>
                <div className="book-property"><p><strong>Completed:</strong> {book.completed ? "Yes" : "No"}</p></div>
                <div className="book-property"><p><strong>Review:</strong> {book.review} </p></div>
                <div className="book-property"><p><strong>Uploaded by:</strong> {username} </p></div>
                <div className="book-property"><p><strong>Rating:</strong></p> <StarRating rating={book.averageRating} /></div>
                <div className="book-property"><p><strong>Your rating:</strong></p>
                    <StarRating
                        rating={userRating}
                        onMouseOver={(rating) => handleRating(rating)}
                        onClick={handleRating}
                        isInteractive={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
