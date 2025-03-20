import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = () => {
    const navRef = useRef(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                navRef.current.classList.add('navbar-black');
            } else {
                navRef.current.classList.remove('navbar-black');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div ref={navRef} className='navbar'>
            <div className="navbar-left">
                <img src={logo} alt="Netflix Logo" />
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={search_icon} alt="Search" className='icons' />
                <p>Children</p>
                <img src={bell_icon} alt="Notifications" className='icons' />
                <div className="navbar-profile" onClick={toggleDropdown}>
                    <img src={profile} alt="Profile" className='profile' />
                    <img src={caret} alt="Caret" /> 
                    {dropdownVisible && (
                        <div className="dropdown" style={{display: dropdownVisible ? 'block' : 'none'}}>
                            <p onClick={() => { logout() }}>Sign Out of Netflix</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar