import React, {useEffect, useContext} from 'react';
import {firebaseConfig} from './../firebase';
import firebase from 'firebase'
import {MainContext} from './../context'
import StyledFirbaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
import userPlaceholder from './../assets/images/user-placeholder.jpeg'
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
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
            <div className="profile__containter">
            <p>this is the Profile</p>
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


