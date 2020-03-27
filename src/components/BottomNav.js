import React from 'react';
import { NavLink } from 'react-router-dom';
import {MainContext} from './../context'
import {FaHome, FaUser, FaCartArrowDown, FaListAlt} from 'react-icons/fa'
export const BottomNav = () => {

    function handleCart(cart){
        if(cart.cart.length){
            return(<span className="nav-link__badge">{cart.cart.length}</span>)
        }
    }

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
                <span className="nav-link__icon">
                    <MainContext.Consumer>
                        {context => 
                            handleCart(context.cart)
                        }
                    </MainContext.Consumer>
             
                    <FaCartArrowDown className="icon"/>
                </span>
                <span className="nav-title">Cart</span>
            </NavLink>

            <NavLink to="/profile" className="nav-link">
                <FaUser className="icon"/>
                <span className="nav-title">Profile</span>
            </NavLink>
        </nav>
    )
}