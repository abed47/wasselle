import React,{createContext, useState, useEffect} from 'react';

export const MainContext = createContext();

export const MainContextProvider = props => {
    let cartStorage = JSON.parse(localStorage.getItem('cart'));
    let cartItems = cartStorage === null || cartStorage == undefined ? []: cartStorage

    const [page, setPage] = useState();
    const [UserObject,setUser] = useState(null);
    const [cart, setCart] = useState(cartItems);
    const [cartTotal, setCartTotal] = useState(0);
    const [isSignedIn, setSindedIn] = useState()
    function removeItem(itemid){
        let updatedCart = cart.filter(item => item.itemId !== itemid);
        setCart(updatedCart)
    }

    function additems(item,callback){
        let itemExist = cart.findIndex(cartItem => cartItem.itemId === item.itemId)
        if(itemExist < 0){
            let updatedCart = [...cart,item]
            setCart(updatedCart)
            return callback()
        }
        let updatedCart = cart;
        updatedCart[itemExist].orderedQuantity = updatedCart[itemExist].orderedQuantity + item.orderedQuantity
        setCart(updatedCart)
        return callback()
    }

    useEffect(() => {
        getCartTotal(cart)
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    useEffect(() => {
        if(isSignedIn && UserObject){
            return
        }else if(isSignedIn && !UserObject && localStorage.getItem('user')){
            let user = JSON.parse(localStorage.getItem('user'));
            setUser(user)
        }else if(!UserObject){
            let user = JSON.parse(localStorage.getItem('user'))
            setUser(user)
        }
    },[UserObject])

    function getCartTotal(arr){
        let total = 0;
        arr.forEach(item => {
            total = total + (item.unitPrice * item.orderedQuantity)
        })
        setCartTotal(total)
    }
    return (
        <MainContext.Provider value={{
            page : {page,setPage},
            cart: {cart, setCart, removeItem, additems},
            cartTotal:{cartTotal,getCartTotal,setCartTotal},
            user:{UserObject,setUser,isSignedIn,setSindedIn}
            }}>
            {props.children}
        </MainContext.Provider>
    )
}