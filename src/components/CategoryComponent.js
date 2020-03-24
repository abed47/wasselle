import React from 'react';
import { FaChevronRight, FaBreadSlice, FaWineBottle} from 'react-icons/fa';
import {GiCheeseWedge, GiFruitBowl} from 'react-icons/gi'
import {AiOutlineHome} from 'react-icons/ai'

export const CategoryComponent = (props) => {
    return(
        <div className="category_round_component">
            <div className="category_icon">
                {getIcon(props.icon)}
            </div>
            <p className="category__title">
                {props.title} <FaChevronRight/>
            </p>
        </div>
    )
}

function getIcon(name){
    switch(name){
        case 'house':
            return (<AiOutlineHome/>);
        break;
        case 'bottle':
            return (<FaWineBottle/>);
            break;
        case 'cheese':
            return (<GiCheeseWedge/>)
            break;
        case 'bread':
            return (<FaBreadSlice/>)
            break;
        case 'fruit':
            return (<GiFruitBowl/>)
            break;
    }
}