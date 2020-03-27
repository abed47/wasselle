import React, { useContext } from 'react';
import {MainContext} from './../context'
export const CheckoutTopBar = props => {
    const contextValues = useContext(MainContext);
    const {cartTotal} = contextValues.cartTotal

    return(
        <div className="checkout__topbar">
                <span className="checkout__total">{
                        cartTotal > 0 ? cartTotal : 0
                } L.L</span>
            <button className="button__checkout" >Checkout</button>
        </div>
    )
}