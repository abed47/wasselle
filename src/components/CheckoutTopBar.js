import React, { useContext } from 'react';
import {MainContext} from './../context';
import {useHistory} from 'react-router-dom';
export const CheckoutTopBar = props => {

    const contextValues = useContext(MainContext);
    const {cartTotal} = contextValues.cartTotal
    const history = useHistory();

    function routeToCheckout(){
        history.push('/checkout')
    }
    return(
        <div className="checkout__topbar">
                <span className="checkout__total">{
                        cartTotal > 0 ? cartTotal : 0
                } L.L</span>
            <button onClick={() => routeToCheckout()} className="button__checkout" >Checkout</button>
        </div>
    )
}