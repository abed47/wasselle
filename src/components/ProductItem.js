import React from 'react';

export const ProductItem = (props) => {
    return(
        <div className="product__view" onClick={() => props.handleClick(props)}>
            <div className="item__img">
            <img src={props.imgPath} alt={props.imgAlt} />
            </div>
            <div className="caption">
                <p className="item__name">{props.itemName}</p>
                <p className="item__price">{props.itemPrice} L.L</p>
            </div>
        </div>
    )
}