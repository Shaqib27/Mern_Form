import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const RefreshHandler = ({ setisAuth2 }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setisAuth2(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setisAuth2]);
    return (
        null
    )
}
