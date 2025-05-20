import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Book from "../components/book";
import Layout from "../components/layout";
import Search from "../components/search";
import Pagination from "../components/pagination";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/index.css";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

const getInitialLimit = () => (window.innerWidth <= 768 ? 10 : 15);

export default function Index() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);
    const [limit, setLimit] = useState(getInitialLimit); 

    const prevPageRef = useRef(page);
    const direction = page > prevPageRef.current ? 1 : -1;

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setLimit(screenWidth <= 768 ? 10 : 15);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + "/libros", {
                    params: {
                        search: searchQuery,
                        page: page,
                        limit: limit
                    }
                });
                setBooks(response.data.books);
                setTotalBooks(response.data.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [searchQuery, page, limit]);

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
                    className="index-books-container"
                >
                    {books.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.04,
                                ease: "easeOut",
                            }}
                            style={{ marginBottom: "15px" }}
                        >
                            <Book item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
            <Pagination
                page={page}
                totalBooks={totalBooks}
                limit={limit}
                handlePageChange={handlePageChange}
            />
        </Layout>
    );
}
