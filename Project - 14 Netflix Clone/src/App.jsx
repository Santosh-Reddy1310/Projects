import React, { useEffect, useState } from 'react';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Player from './pages/Player/Player.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (user) => {
                setLoading(false); // Authentication state determined
                if (user) {
                    console.log('User Logged In');
                    navigate('/');
                } else {
                    console.log('User Logged Out');
                    if (window.location.pathname !== '/login') {
                        navigate('/login');
                    }
                }
            },
            (error) => {
                console.error('Authentication error:', error);
                setLoading(false); // Even on error, stop loading
            }
        );

        return () => unsubscribe();
    }, []); // Empty dependency array

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return (
        <div>
            <ToastContainer theme='dark' />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/player/:id' element={<Player />} />
            </Routes>
        </div>
    );
};

export default App;