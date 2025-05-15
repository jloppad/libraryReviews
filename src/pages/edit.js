import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import BookForm from "../components/bookForm";

export default function Edit() {
    const { bookId } = useParams();
    const navigate = useNavigate(); 
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [intro, setIntro] = useState("");
    const [review, setReview] = useState("");
    const [completed, setCompleted] = useState(false);
    const [cover, setCover] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [preview, setPreview] = useState(null);
    const [previewImage1, setPreviewImage1] = useState(null);
    const [previewImage2, setPreviewImage2] = useState(null);
    const [changeImage, setChangeImage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + `/books/${bookId}`);
                setTitle(data.title);
                setAuthor(data.author);
                setIntro(data.intro);
                setReview(data.review);
                setCompleted(data.completed);
                if (data.cover) {
                    setCover(data.cover);
                    setPreview(process.env.REACT_APP_API_URL + `${data.cover}`);
                }
                try {                    
                    const { data } = await axios.get(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagenes`);
                    
                    if (data[0]) {
                        setPreviewImage1(process.env.REACT_APP_API_URL + `${data[0]}`);
                    }
                    
                    if (data[1]) {
                        setPreviewImage2(process.env.REACT_APP_API_URL + `${data[1]}`);
                    }                  
                } catch (err) {
                    setError(err.response?.data?.error || "Images could not be loaded");
                }


            } catch (err) {
                setError(err.response?.data?.error || "Book could not be loaded");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setCompleted(checked ? 1 : 0);
        } else{
            switch (name) {
                case "title": setTitle(value); break;
                case "author": setAuthor(value); break;
                case "intro": setIntro(value); break;
                case "review": setReview(value); break;
                default: break;
            }
        }
    };

    const handleOnChangeFile = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
            if (!validImageTypes.includes(file.type)) {
                alert("Please select a valid image file (JPG, PNG, GIF, WEBP).");
                return;
            }

            if ((name === 'image1' || name === 'image2') && !changeImage) {
                setChangeImage(true);
                setPreviewImage1(null);
                setPreviewImage2(null);
            }

            if (name === 'cover') {
                setCover(file);
                setPreview(URL.createObjectURL(file));
            } else if (name === 'image1') {
                setImage1(file);
                setPreviewImage1(URL.createObjectURL(file));
            } else if (name === 'image2') {
                setImage2(file);
                setPreviewImage2(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("intro", intro);
        formData.append("review", review);
        formData.append("completed", completed);
    
        if (cover) {
            formData.append("cover", cover);
        }
    
        try {
            await axios.put(process.env.REACT_APP_API_URL + `/libros/${bookId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (image1 || image2) {
                await axios.delete(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagenes`);
            }
    
            if (image1) {
                const imageFormData = new FormData();
                imageFormData.append('image', image1);
                await axios.put(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagen`, imageFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
    
            if (image2) {
                const imageFormData = new FormData();
                imageFormData.append('image', image2);
                await axios.put(process.env.REACT_APP_API_URL + `/libros/${bookId}/imagen`, imageFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
    
            alert("Successfully updated book.");
            navigate(`/view/${bookId}`);
        } catch (err) {
            setError(err.response?.data?.error || "Error updating the book");
        }
    };
    

    if (loading) return <Layout><p className="loading">Loading...</p></Layout>;
    if (error) return <Layout><p className="error">{error}</p></Layout>;

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
                coverPreview={preview}
                image1Preview={previewImage1}
                image2Preview={previewImage2}
                isEdit={true}
                bookId={bookId}
            />
        </Layout>
    );
}
