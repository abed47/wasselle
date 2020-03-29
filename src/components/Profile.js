import React, {useEffect, useContext} from 'react';
import {firebaseConfig} from './../firebase';
import firebase from 'firebase'
import {MainContext} from './../context'
import StyledFirbaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory, Link } from 'react-router-dom';
import {FaTruck, FaWhatsapp} from 'react-icons/fa';
import {GoInfo} from 'react-icons/go'
import LogoPng from './../assets/images/logo-no-bg.svg'
if(!firebase.apps.length)
{
    firebase.initializeApp({firebaseConfig})
}
export const Profile = () => {
    const history = useHistory();
    const contextValues = useContext(MainContext)
    const {isSignedIn,setSindedIn,UserObject, setUser} = contextValues.user
    const {setPage} = contextValues.page
    const uiConfig = {
        signInFlow: "popup",
        signInOptions:[
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => handleLogin()
        }
    }

    const handleLogout = async () => {
        await firebase.auth().signOut();
        setSindedIn(!isSignedIn);
        await localStorage.removeItem('user');
        setUser(null)
        history.push('/profile')
    }

    const handleLogin = async () => {
        let userObj = {};
        setSindedIn(true);
        userObj = await firebase.auth().currentUser;
        localStorage.setItem('user',JSON.stringify(userObj));
        setUser(userObj);
        history.push('/profile');
    }

    useEffect(() => {
        
        if(JSON.parse(localStorage.getItem('user')) === null){
            setSindedIn(false)
        }
        setPage('profile')
        },[])


        return(
        <div className="profile">
            {isSignedIn !== false? 
            (
            <div className="profile__container">
            <img src={LogoPng} className="profile__container__logo"/>
            <Link to={`/orderHistory/${!JSON.parse(localStorage.getItem('user')) ? '' : JSON.parse(localStorage.getItem('user')).uid  }`} className="profile__container__link">Order history <FaTruck /></Link>
            <a href="https://wa.me/96176402094" className="profile__container__link">Contact Support <FaWhatsapp /></a>
            <a href="https://www.revision-lb.com" className="profile__container__link">About Us <GoInfo /></a>
            <button className="button__logout" onClick={() => handleLogout()}>logout</button>
            </div>
            ) :
            (
                <StyledFirbaseAuth 
                uiConfig={uiConfig} 
                firebaseAuth={firebase.auth()} />
            )
            }

        </div>
    )
}


