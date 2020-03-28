import React,{useContext,useEffect, useState} from 'react';
import {MainContext} from './../context';

export const CheckOutPage = () => {
    const contextValues = useContext(MainContext);
    const {setPage} = contextValues.page;
    const {UserObject} = contextValues.user
    const {cart,setCart} = contextValues.cart
    const [user, setUser] = useState({});
    function checkout(){

    }

    function getCartTotal(arr){
        let total  = 0;
        if(arr.length < 1){
            return total;
        }

        arr.forEach(item => {
            total = total + (item.orderedQuantity * item.unitPrice)
        })
        
        return total;
    }

    useEffect(() => {
        if(UserObject){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        setPage('checkout')
    },[]);

    return(
        <div className="checkout">   
            <div className="checkout__container">
                <div className="checkout__items">
                    
                    {
                        cart.map(item => {
                            return (
                                <div className="checkout__item">
                                    <span className="item__name">{item.name}</span>
                                    <span className="item__quantity">x {item.orderedQuantity}</span>
                                    <span className="item__price">{item.orderedQuantity * item.unitPrice} L.L</span>
                                </div>
                            )
                        })
                    }

                </div>
                <span className="checkout__user">
                    {
                        user.displayName ? user.displayName :
                        <span className="checkout__input__group">
                            <label className="d-block">name:</label>
                            <input />
                        </span>
                    }
                </span>
                <span className="checkout__phone">
                    {
                        user.phoneNumber ? user.phoneNumber :
                        <span className="checkout__input__group">
                            <label className="d-block">phone:</label>
                            <input />
                        </span>
                    }
                </span>
                <span className="checkout__location">
                    {
                        user.location ? user.location :
                        <button className="button__primary__outline">Get Location</button>
                    }
                </span>
                <span className="checkout__input__group">
                    <label className="d-block">building:</label>
                    <input />
                </span>
                <span className="checkout__input__group">
                    <label className="d-block">floor:</label>
                    <input />
                </span>
                <span className="checkout__total d-block"> {getCartTotal(cart)} L.L</span>
                <button className="button__confirm d-block">Cofirm</button>
            </div>
        </div>
    )
}