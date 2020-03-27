import React,{useContext} from 'react'
import {MainContext} from './../context';
import {CheckoutTopBar} from './CheckoutTopBar';
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
                (<div>SafeShop</div>)
            }
        </div>
    )
}