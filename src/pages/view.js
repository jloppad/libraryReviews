import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout";
import { useState, useEffect, useCallback } from "react";
import BookDetail from "../components/bookDetail";
import Comments from "../components/comments";
import "../styles/view.css";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

export default function View() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("Usuario desconocido");
    const [userId, setUserId] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalComments, setTotalComments] = useState(0);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const activeUser = localStorage.getItem("userId");
    const limit = 5;


    const fetchBook = useCallback(async () => {
        try {   
            const { data } = await axios.get(process.env.REACT_APP_API_URL + `/books/${bookId}`);
            setBook(data);
            if (data.userId) fetchUsername(data.userId);
        } catch (err) {
            setError(err.response?.data?.error || "Book not found");
        } finally {
            setLoading(false);
        }
    }, [bookId]);

    const fetchImages = useCallback(async () => {
        if (images.length > 0) return; 
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagenes`);
            let imageList = data.map(img => (process.env.REACT_APP_API_URL + `${img}`));
            
            if (book?.cover) {
                const coverUrl = process.env.REACT_APP_API_URL + `${book.cover}`;
                imageList = [coverUrl, ...imageList]; 
            }
            
            setImages(imageList);
            if (imageList.length > 0) {
                setMainImage(imageList[0]); 
            }
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    }, [bookId, book, images]);

    const fetchUsername = async (userId) => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + `/users/${userId}`);
            setUsername(data.username);
        } catch (err) {
            console.error("Error obtaining user:", err.response?.data?.error || err.message);
        }
    };

    const fetchRating = async (userId, bookId) => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + `/valoracion/${userId}/${bookId}`);
            if (data.length > 0) {
                setUserRating(data[0].value);
            }
        } catch (err) {
            console.log("Error fetching rating:", err);
        }
    };

    const fetchComments = useCallback(async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + `/comentarios/${bookId}?page=${currentPage}&limit=5`);
            setComments(data.comments); 
            setTotalComments(data.total); 
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    }, [bookId, currentPage]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await axios.delete(process.env.REACT_APP_API_URL + `/books/${bookId}`);
                alert("Book successfully removed.");
                navigate("/");
            } catch (err) {
                setError(err.response?.data?.error || "Error deleting the book");
            }
        }
    };

    const handleRating = async (rating) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + `/ratings`, { userId, bookId, value: rating });
            setUserRating(rating);
            fetchBook(); 
        } catch (err) {
            console.error("Error saving rating:", err);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            await axios.post(process.env.REACT_APP_API_URL + "/comments", {
                userId,
                bookId,
                comment: newComment,
            });
            setNewComment("");
            fetchComments(); 
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await axios.delete(process.env.REACT_APP_API_URL + `/comments/${commentId}`);
                fetchComments(); 
            } catch (err) {
                console.error("Error deleting comment:", err);
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleImageClick = (selectedImage) => {
        if (selectedImage !== mainImage) {
            setImages(images.map(img => (img === selectedImage ? mainImage : img)));
            setMainImage(selectedImage);
        }
    };
    
    const renderMainImage = () => {
        if (mainImage) {
            return (
                <img src={mainImage} alt="Main Book" />
            );
        } else {
            return (
                <img src={process.env.REACT_APP_API_URL + '/uploads/default.png'} alt="Default Book" />
            );
        }
    }; 

    useEffect(() => {
        const fetchActiveUser = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + `/users/${activeUser}`);
                setUserId(data.id);
                setIsAdmin(data.admin === 1);
            } catch (err) {
                console.error("Error fetching active user:", err);
            }
        };
    
        if (activeUser) {
            fetchActiveUser();
        }
    
        if (activeUser && bookId) {
            fetchBook();
            fetchRating(activeUser, bookId);
            fetchComments(); 
        }
    }, [bookId, activeUser, currentPage, fetchBook, fetchComments]);
    
    

    useEffect(() => {
        if (book) {
            fetchImages();
        }
    }, [book, fetchImages]); 

    if (loading) {
        return (
            <Layout>
                <p className="loading">
                    <Quantum
                        size="45"
                        speed="1.75"
                        color="white" 
                    />
                </p>
            </Layout>
        );
    }
    if (error) return <Layout><p className="error">{error}</p></Layout>;
    if (!book) return <Layout><p className="not-found">Book not found</p></Layout>;

    return (
        <Layout>
            <BookDetail 
                book={book} 
                username={username} 
                userRating={userRating} 
                handleRating={handleRating} 
                renderMainImage={renderMainImage} 
                images={images} 
                handleImageClick={handleImageClick}
            />

            <div className="buttons-section">
                {/* eslint-disable-next-line */}
                {(userId == book.userId || isAdmin) && (
                    <div className="book-actions">
                        <Link to={`/edit/${bookId}`} className="button-link">
                            <button className="edit-btn">Modify</button>
                        </Link>
                        <button className="delete-btn" onClick={handleDelete}>Remove</button>
                    </div>
                )}
            </div>

            <Comments 
                comments={comments} 
                userId={userId} 
                isAdmin={isAdmin} 
                handleDeleteComment={handleDeleteComment} 
                newComment={newComment} 
                setNewComment={setNewComment} 
                handleAddComment={handleAddComment} 
                page={currentPage} 
                totalBooks={totalComments} 
                limit={limit} 
                handlePageChange={handlePageChange} 
            />
        </Layout>
    );
}
