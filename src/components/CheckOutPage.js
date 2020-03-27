import React,{useContext,useEffect} from 'react';
import {MainContext} from './../context';

export const CheckOutPage = () => {
    const contextValues = useContext(MainContext);
    const {setPage} = contextValues.page;
    const {UserObject} = contextValues.user
    const {cart,setCart} = contextValues.cart
    
    function checkout(){

    }

    useEffect(() => {
        setPage('checkout')
        console.log(UserObject)
    },[]);

    return(
        <div className="checkout__container">
            
        </div>
    )
}