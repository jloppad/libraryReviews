import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { FaSignOutAlt, FaHome, FaBook, FaBookMedical, FaBookOpen, FaHospitalUser } from "react-icons/fa";
import axios from "axios";
import {
    AiOutlineHome, AiFillHome,
    AiOutlinePlusCircle, AiFillPlusCircle,
    AiOutlineBook, AiFillBook,
    AiOutlineUser,
    AiOutlineLogout,
} from "react-icons/ai";



export default function Navbar() {
    const location = useLocation();
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');

        setUsername(storedUsername);

        if (userId) {
            axios.get(process.env.REACT_APP_API_URL + `/users/${userId}`)
                .then(res => {
                    setIsAdmin(res.data.admin === 1);
                })
                .catch(err => {
                    console.error("Error fetching user info:", err);
                });
        }
    }, []);

    const linkStyle = (path) => ({
        padding: '10px',
        display: 'block',
        fontSize: '18px',
        color: 'white',
        textDecoration: 'none',
        fontWeight: location.pathname === path ? 'bold' : 'normal',
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        window.location.href = '/login';
    };

    const getIcon = () => {
        switch (location.pathname) {
            case "/":
                return <FaHome size={24} />;
            case "/review":
                return <FaBook size={24} />;
            case "/create":
                return <FaBookMedical size={24} />;
            default:
                return <FaBookOpen size={24} />;
        }
    };

    return (
    <>
        <div className="navbar-container">
            <div className="navbar-menu-container">
                <Link to="/" className="navbar-link" style={linkStyle("/")}>Home</Link>
                <Link to="/create" className="navbar-link" style={linkStyle("/create")}>New Review</Link>
            </div>

            <div className="navbar-icon">
                {getIcon()}
            </div>

            {username && (
                <div className="navbar-user-container">
                    {isAdmin && (
                        <Link to="/admin" className="navbar-link">
                            <FaHospitalUser size={24} style={{ marginRight: '5px' }} />
                        </Link>                            
                    )}
                    <Link to="/review" className="navbar-link" style={linkStyle("/review")}>Your Reviews</Link>
                    <span className="navbar-user" onClick={handleLogout}>
                        Welcome, {username} <FaSignOutAlt size={17} />
                    </span>
                </div>
            )}

        </div>
        <div className="mobile-navbar">
            <Link to="/" className="mobile-icon">
                {location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
            </Link>
            <Link to="/create" className="mobile-icon">
                {location.pathname === "/create" ? <AiFillPlusCircle /> : <AiOutlinePlusCircle />}
            </Link>
            <Link to="/review" className="mobile-icon">
                {location.pathname === "/review" ? <AiFillBook /> : <AiOutlineBook />}
            </Link>
            {isAdmin && (
                <Link to="/admin" className="mobile-icon">
                    <AiOutlineUser />
                </Link>
            )}
            <span className="mobile-icon" onClick={handleLogout}>
                <AiOutlineLogout />
            </span>
        </div>
    </>
    );
}
