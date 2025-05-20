import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Book from "../components/book";
import Layout from "../components/layout";
import Search from "../components/search";
import Pagination from "../components/pagination";
import "../styles/review.css";
import { motion, AnimatePresence } from "framer-motion";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

const getInitialLimit = () => (window.innerWidth <= 768 ? 4 : 5);

export default function Review() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);
    const [limit, setLimit] = useState(getInitialLimit); 

    const userId = localStorage.getItem("userId");
    const prevPageRef = useRef(page);
    const direction = page > prevPageRef.current ? 1 : -1;

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setLimit(screenWidth <= 768 ? 4 : 5);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            if (!userId) {
                setError("No authenticated user.");
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + `/libros/usuario/${userId}`, {
                    params: {
                        search: searchQuery,
                        page: page,
                        limit: limit
                    }
                });
                setBooks(data.books);
                setTotalBooks(data.total);
            } catch (err) {
                setError(err.response?.data?.error || "Error obtaining books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [userId, searchQuery, page, limit]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        prevPageRef.current = page;
        setPage(newPage);
    };

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
    if (error) return <Layout>{error}</Layout>;

    return (
        <Layout>
            <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 100 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 * direction }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="books-container"
                    style={{
                        position: "relative",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: books.length === 0 ? "center" : "left",
                    }}
                >
                    {books.length === 0 ? (
                        <h4 className="message-style">No books found</h4>
                    ) : (
                        books.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.07,
                                    ease: "easeOut",
                                }}
                                style={{ marginBottom: "15px" }}
                            >
                                <Book item={item} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>
            {books.length > 0 && (
                <Pagination
                    page={page}
                    totalBooks={totalBooks}
                    limit={limit}
                    handlePageChange={handlePageChange}
                />
            )}
        </Layout>
    );
}
