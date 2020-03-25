import React from 'react';
import { NavLink } from 'react-router-dom';

export const ProductItem = (props) => {
    return(
        <NavLink to={`/items/${props.itemLink}`} className="product__view">
            <div className="item__img">
            <img src={props.img} alt={props.imgAlt} />
            </div>
            <div className="caption">
                <p className="item__name">{props.itemName}</p>
                <p className="item__price">{props.itemPrice} L.L</p>
            </div>
        </NavLink>
    )
}