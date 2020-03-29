import React,{useContext} from 'react'
import {MainContext} from './../context';
import {CheckoutTopBar} from './CheckoutTopBar';
import LogoPng from './../assets/images/logo-white.svg'

export const TopBar = () => {

    const contextValues = useContext(MainContext);
    const {page} = contextValues.page

    
    
    return(
        <div className="topbar">
            {
                page === 'cart' ?
                (
                    <CheckoutTopBar />
                ) :
                (<div> <img className="topbar__logo" src={LogoPng}/> SafeShop</div>)
            }
        </div>
    )
}