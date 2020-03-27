import React, {useState, useEffect, useContext} from 'react';
import {firebaseConfig} from './../firebase';
import firebase from 'firebase'
import {MainContext} from './../context'
import StyledFirbaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';
if(!firebase.apps.length)
{
    firebase.initializeApp({firebaseConfig})
}
export const Profile = () => {
    const history = useHistory();
    const contextValues = useContext(MainContext)
    const {setPage} = contextValues.page
    const [isSignedIn, setSindedIn] = useState(false)
    const uiConfig = {
        signInFlow: "popup",
        signInOptions:[
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => handleLogin()
        }
    }

    const handleLogout = () => {
        firebase.auth().signOut();
        setSindedIn(!isSignedIn);
        localStorage.removeItem('user');
    }

    const handleLogin = async () => {
        let userObj = {};
        userObj = await firebase.auth().currentUser;
        localStorage.setItem('user',JSON.stringify(userObj));
        history.push('/profile');
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setSindedIn(!isSignedIn)
        })
    }, [firebase.auth().currentUser])

    useEffect(() => {
        console.log('sldjf')
        setPage('profile')
    },[])
    return(
        <div className="profile">
            {!isSignedIn ? 
            (
            <div>
            <p>this is the Profile</p>
            <button onClick={() => handleLogout()}>logout</button>
            </div>) :
            (
                <StyledFirbaseAuth 
                uiConfig={uiConfig} 
                firebaseAuth={firebase.auth()} />
    
            )
   
            }

        </div>
    )
}


