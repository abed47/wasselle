import React,{useContext, useEffect} from 'react';
import {CartListItem} from './CartListItem'
import {MainContext} from './../context';
export const Cart = () => {
    const cartValues = useContext(MainContext)
    const {cart, setCart} = cartValues.cart
    return(
        <div className="cart">
            {
                cart.map((item,index) =>
                    (<CartListItem
                    key={index}
                    itemIndex={index}
                    imgPath={item.imgPath}
                    name={item.name}
                    orderedQuantity={item.orderedQuantity}
                    unitMeasure={item.unitMeasure}
                    unitPrice={item.unitPrice}
                    />)
                )
            }
            
        </div>
    )
}