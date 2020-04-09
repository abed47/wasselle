import React, { useState, useContext } from 'react';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { MainContext } from './../context';
import Modal from 'react-modal'
export const CartListItem = (props) => {
    const [orderedQuantity, setorderedQuantity] = useState(props.orderedQuantity)
    const value = useContext(MainContext)
    const { cart, setCart, removeItem} = value.cart
    const {getCartTotal} = value.cartTotal
    const [modalOptions, setModalOptions] = useState({isOpen: false, itemId: null})

    const modalStyle = {
        overlay:{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%'
        },
        content:{
        position: 'none',
        marginTop: '50px',
        padding: 0,
        width: '250px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
        }}
        
    function addQuantity() {
        let items = cart;
        items[props.itemIndex].orderedQuantity = items[props.itemIndex].orderedQuantity + 1;
        setCart(items)
        setorderedQuantity(cart[props.itemIndex].orderedQuantity)
    }

    function deduceQuantity() {
        let items = cart;
        items[props.itemIndex].orderedQuantity = items[props.itemIndex].orderedQuantity - 1;
        if(items[props.itemIndex].orderedQuantity < 1){
            items[props.itemIndex].orderedQuantity = 0
        }
        setCart(items)
        setorderedQuantity(cart[props.itemIndex].orderedQuantity)
    }

    function cancelRemove(){
        setModalOptions({isOpen:false,itemId:null})
    }

    function confirmRemoveItem(id){
        removeItem(id);
        setModalOptions({isOpen:false,itemId: null})
    }

    return (
        <div className="cart__item_wrapper">
                <Modal 
                    ariaHideApp={false}
                    style={modalStyle} isOpen={modalOptions.isOpen}>
                    <p className="modal__title">Are you sure you want to remove this is item?</p>
                    <div className="modal__buttons__container">
                        <button className="button__cancel" onClick={() => {cancelRemove()}} >Cancel</button>
                        <button className="button__confirm" onClick={() => {confirmRemoveItem(props.itemId)}} >Yes</button>
                    </div>
                </Modal>
            <MainContext.Consumer>

                {context => {
                    localStorage.setItem('cart',JSON.stringify(context.cart.cart))
                    let cartItem = context.cart.cart[props.itemIndex]
                        return (
                        <>

                        <div className="cart__item">
                            <div className="cart__item__image" >
                                <img src={props.imgPath} alt="item img" />
                            </div>
                            <div className="cart__item__details">
                                <span className="item__title" >{props.name}</span>
                                <span className="item__unit__price" > L.L {props.unitPrice}/{props.unitMeasure}</span>
                                <div className="item__quantity__controls">
                                    <span className="control__add" onClick={() => {
                                        getCartTotal(cart)
                                        deduceQuantity()
                                    }}> <FaMinus /> </span>
                                    <span className="control__quantity"> {orderedQuantity} </span>
                                    <span className="control__deduce" onClick={() => {
                                        getCartTotal(cart)
                                        addQuantity()}}> <FaPlus /> </span>
                                </div>
                            </div>
                        </div>
                        <div className="cart__item__right">
                            <span>
                                {cartItem.orderedQuantity * cartItem.unitPrice} L.L
                            </span>
                            <FaTrashAlt onClick={() => {setModalOptions({isOpen: true,itemId:props.itemId})}}/>
                        </div>
                    </>
                    )}}
            </MainContext.Consumer>
        </div>
    )
}


