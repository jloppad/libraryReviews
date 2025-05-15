import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            setIsAuthorized(false);
            setLoading(false);
            return;
        }

        axios.get(process.env.REACT_APP_API_URL + `/users/${userId}`)
            .then(res => {
                const isAdminRoute = location.pathname.startsWith('/admin');
                if (isAdminRoute && res.data.admin !== 1) {
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            })
            .catch(err => {
                console.error('Error verifying user:', err);
                setIsAuthorized(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.pathname]);

    if (loading) return <div>Loading...</div>;

    return isAuthorized ? children : <Navigate to="/login" replace />;
}
