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
    const [cart, setCart] = useState(cartItems);
    const [cartTotal, setCartTotal] = useState(0)
    function removeItem(itemid){
        let updatedCart = cart.filter(item => item.itemId !== itemid);
        setCart(updatedCart)
    }

    useEffect(() => {
        getCartTotal(cart)
    },[cart])

    function getCartTotal(arr){
        let total = 0;
        arr.forEach(item => {
            total = total + (item.unitPrice * item.orderedQuantity)
        })
        setCartTotal(total)
    }
    return (
        <MainContext.Provider value={{page : {page,setPage}, cart: {cart, setCart, removeItem},cartTotal:{cartTotal,getCartTotal,setCartTotal}}}>
            {props.children}
        </MainContext.Provider>
    )
}