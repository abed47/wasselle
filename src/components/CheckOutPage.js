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
        console.log(cart)
    },[]);

    return(
        <div className="checkout">   
            <div className="checkout__container">
                <div className="checkout__items">
                    <div className="checkout__item">
                        <span className="item__name">item 1</span>
                        <span className="item__quantity">x 7</span>
                        <span className="item__price">1254 L.L</span>
                    </div>

                    <div className="checkout__item">
                        <span className="item__name">item 1</span>
                        <span className="item__quantity">x 7</span>
                        <span className="item__price">1254 L.L</span>
                    </div>

                    <div className="checkout__item">
                        <span className="item__name">item 1</span>
                        <span className="item__quantity">x 7</span>
                        <span className="item__price">1254 L.L</span>
                    </div>

                    <div className="checkout__item">
                        <span className="item__name">item 1</span>
                        <span className="item__quantity">x 7</span>
                        <span className="item__price">1254 L.L</span>
                    </div>
                </div>
                <span className="checkout__user">abed</span>
                <span className="checkout__phone">phone</span>
                <span className="checkout__location">location</span>
                <span className="checkout__total">12551 L.L</span>
                <button className="button__confirm">Cofirm</button>
            </div>
        </div>
    )
}