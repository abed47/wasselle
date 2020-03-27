import React,{useContext, useEffect} from 'react';
import {CartListItem} from './CartListItem'
import {MainContext} from './../context';
export const Cart = () => {
    const contextValues = useContext(MainContext)
    const {cart} = contextValues.cart
    const {setPage} = contextValues.page

    useEffect(() => {
        setPage('cart')
    },[])
    return(
        <div className="cart">
            {
                cart.map((item,index) =>
                    (<CartListItem
                    key={index}
                    itemId={item.itemId}
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