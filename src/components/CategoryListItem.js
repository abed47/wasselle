import React from 'react';
import {GiBread, GiFruitBowl, GiMedicalPackAlt} from 'react-icons/gi';
import {FaWineBottle} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import { Link } from 'react-router-dom';
export const CategoryListItem = (props) => {
    return (
        <Link to={`/category/${props.id}`} className="category__list__item">
            <span className="list__item__icon" >{getIcon(props.iconName)}</span>
            <span className="list__item__title">{props.title}</span>
        </Link>
    )
}

function getIcon(iconName){
    switch (iconName){
        case 'fruit':
            return <GiFruitBowl/>;
            break;
        case 'bread':
            return <GiBread/>;
            break;
        case 'bottle':
            return <FaWineBottle/>
            break;
        case 'house':
            return <AiOutlineHome/>
            break;
        case 'medical':
            return <GiMedicalPackAlt/>
            break;        
    }
}