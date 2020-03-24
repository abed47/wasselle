import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaHome, FaUser, FaCartArrowDown, FaListAlt} from 'react-icons/fa'
export const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <NavLink exact to="/" className="nav-link">
                <FaHome className="icon"/>
                <span>Home</span>
            </NavLink>

            <NavLink to="/categories" className="nav-link">
                <FaListAlt className="icon"/>
                <span>Categories</span>
            </NavLink>

            <NavLink to="/cart" className="nav-link">
                <FaCartArrowDown className="icon"/>
                <span className="nav-title">Cart</span>
            </NavLink>

            <NavLink to="/profile" className="nav-link">
                <FaUser className="icon"/>
                <span className="nav-title">Profile</span>
            </NavLink>
        </nav>
    )
}