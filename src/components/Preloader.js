import React from 'react';
import {BarLoader} from 'react-spinners';
import  LOGOIMG from './../assets/images/logo-no-bg.svg';
export const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <BarLoader height="4px" width="100%" color="#5CC062" />

                <img src={LOGOIMG} alt="logo"/>
            </div>
        </div>
    )
}