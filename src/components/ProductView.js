import React,{useState, useContext} from 'react';
import {FaPlus, FaMinus, FaTimes} from 'react-icons/fa'
import { MainContext } from '../context';
export const ProductView = props => {

    const contextValues = useContext(MainContext)
    const {additems} = contextValues.cart
    const [count, setCount] = useState(1)

    function incrementCount(){
        setCount(count + 1)
    }

    function deduceCount(){
        let updatedCount = count - 1;
        if(updatedCount < 1){
            return setCount(1)
        }
        setCount(count - 1)
    }

    function addToCart(){
        let item = {};
        item.name = props.selectedItem.name
        item.imgPath = props.selectedItem.imgPath;
        item.itemId = props.selectedItem.id;
        item.orderedQuantity = count;
        item.unitMeasure = props.selectedItem.unitMeasure;
        item.unitPrice = props.selectedItem.unitPrice;
        additems(item,() => {props.selectedItem.handleClose()})
        
    }


    return (
        <div className="product__display">
            <span className="product__display__close" onClick={() => props.selectedItem.handleClose()}><FaTimes/></span>
            <img src={props.selectedItem.imgPath} alt="item img"/>
            <div className="product__display__name">
                <span className="product__display__name__title" >{props.selectedItem.name}</span>
                <span className="product__display__name__price">{props.selectedItem.unitPrice}/{props.selectedItem.unitMeasure}</span>
            </div>
            <div className="product__display__controls">
                <div className="quantity__controlls">
                    <span className="controlls__add" onClick={() => deduceCount()}><FaMinus/></span>
                    <span className="controlls__count">{count}</span>
                    <span className="controlls__deduce" onClick={() => incrementCount()}><FaPlus/></span>
                </div>
                <button className="button__add__to__cart" onClick={() => addToCart()}>ADD</button>
            </div>
            <div className="product__display__description">
                <h5>Details</h5>
                <p>{props.selectedItem.description}</p>
            </div>
        </div>
    )
}