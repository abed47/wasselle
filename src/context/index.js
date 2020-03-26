import React,{createContext, useState, useEffect} from 'react';

export const MainContext = createContext();

export const MainContextProvider = props => {
    let cartItems = [
        {
            name: "grapes",
            unitPrice: 500,
            unitMeasure: 'kg',
            orderedQuantity: 5,
            imgPath: 'https://www.nogarlicnoonions.com/images/uploads/NEWS/grapes%202.jpg',
            itemId: '1'
        },
        {
            name: "grapes 2",
            unitPrice: 500,
            unitMeasure: 'kg',
            orderedQuantity: 5,
            imgPath: 'https://www.nogarlicnoonions.com/images/uploads/NEWS/grapes%202.jpg',
            itemId: '2'
        }
    ]
    const [page, setPage] = useState();
    const [cart, setCart] = useState(cartItems)
    return (
        <MainContext.Provider value={{page : {page,setPage}, cart: {cart, setCart}}}>
            {props.children}
        </MainContext.Provider>
    )
}