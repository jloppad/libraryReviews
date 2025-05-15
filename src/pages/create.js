import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "../components/layout";
import BookForm from "../components/bookForm"

export default function Create() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [intro, setIntro] = useState('');
    const [completed, setCompleted] = useState(0);
    const [review, setReview] = useState('');
    const [previewCover, setPreviewCover] = useState(null);
    const [previewImage1, setPreviewImage1] = useState(null);
    const [previewImage2, setPreviewImage2] = useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setCompleted(checked ? 1 : 0);
        } else {
            switch (name) {
                case 'title': setTitle(value); break;
                case 'author': setAuthor(value); break;
                case 'intro': setIntro(value); break;
                case 'review': setReview(value); break;
                default: break;
            }
        }
    }

    const handleOnChangeFile = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
            if (!validImageTypes.includes(file.type)) {
                alert("Please select a valid image file (JPG, PNG, GIF, WEBP).");
                return;
            }

            if (name === 'cover') {
                setCover(file);
                setPreviewCover(URL.createObjectURL(file));
                setImage1(null);  
                setImage2(null); 
            } else if (name === 'image1') {
                setImage1(file);
                setPreviewImage1(URL.createObjectURL(file));
            } else if (name === 'image2') {
                setImage2(file);
                setPreviewImage2(URL.createObjectURL(file));
            }
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
    
        if (!token) {
            console.error('No valid token found');
            return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('intro', intro);
        formData.append('completed', completed);
        formData.append('review', review);
        formData.append('userId', userId);
        if (cover) formData.append('cover', cover);
    
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/libros', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            const bookId = response.data.bookId; 

            if (image1) {
                const imageFormData = new FormData();
                imageFormData.append('image', image1);
                await axios.post(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagen`, imageFormData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } 

            if (image2) {
                const imageFormData = new FormData();
                imageFormData.append('image', image2);
                await axios.post(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagen`, imageFormData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } 
    
            navigate('/');
        } catch (error) {
            console.error('Error creating the book or uploading images:', error.response?.data || error.message);
        }
    }
    

    return (
        <Layout>
            <BookForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleOnChangeFile={handleOnChangeFile}
                title={title}
                author={author}
                intro={intro}
                review={review}
                completed={completed}
                coverPreview={previewCover}
                image1Preview={previewImage1}
                image2Preview={previewImage2}
            />
        </Layout>
    );
}
