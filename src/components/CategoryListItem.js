import React from 'react';
import {
    GiFruitBowl, 
    GiCheeseWedge,
    GiWrappedSweet,
    GiCupcake,
    GiCarrot,
    GiNoodles,
    GiCakeSlice,
    GiWheat
} from 'react-icons/gi';
import {
    FaWineBottle,
    FaBreadSlice,
    FaBirthdayCake,
    FaPrescriptionBottleAlt,
    FaCarrot,
    FaAppleAlt,
    FaLemon,
    FaPepperHot,
} from 'react-icons/fa';
import {AiOutlineHome, AiOutlineCoffee} from 'react-icons/ai';
import {
    IoIosBasket,
    IoIosCart,
    IoIosHeart,
    IoIosPaw,
    IoIosWine,
    IoMdMedical,
    IoIosGift,
    
} from 'react-icons/io'
import {
    TiLightbulb,
    TiLeaf,
    TiPhoneOutline,
    TiThermometer,
} from 'react-icons/ti'
import { Link } from 'react-router-dom';
export const CategoryListItem = (props) => {
    return (
        <Link to={`/category/${props.id}`} className="category__list__item">
            <span className="list__item__icon" >{getIcon(props.iconName)}</span>
            <span className="list__item__title">{props.title}</span>
        </Link>
    )
}

function getIcon(name){
    switch(name){
        case 'house':
            return (<AiOutlineHome/>);
        case 'bottle':
            return (<FaWineBottle/>);
        case 'cheese':
            return (<GiCheeseWedge/>)
        case 'bread':
            return (<FaBreadSlice/>)
        case 'fruit':
            return (<GiFruitBowl/>)
        case 'candy':
            return (<GiWrappedSweet/>)
        case 'cup-cake':
            return (<GiCupcake/>)
        case 'cake-slice':
            return (<GiCakeSlice/>)
        case 'cake-bday':
            return (<FaBirthdayCake/>)
        case 'medical':
            return (<IoMdMedical/>)
        case 'medicen':
            return (<FaPrescriptionBottleAlt/>)
        case 'basket':
            return (<IoIosBasket/>)
        case 'cart':
            return (<IoIosCart/>)
        case 'gift':
            return (<IoIosGift/>)
        case 'carrot':
            return (<FaCarrot/>)
        case 'carrot-alt':
            return (<GiCarrot/>)
        case 'apple':
            return (<FaAppleAlt/>)
        case 'lemon':
            return (<FaLemon/>)
        case 'pepper':
            return (<FaPepperHot/>)
        case 'wheat':
            return (<GiWheat/>)
        case 'animal':
            return (<IoIosPaw/>)
        case 'glass':
            return (<IoIosWine/>)
        case 'bulb':
            return (<TiLightbulb/>)
        case 'leaf':
            return (<TiLeaf/>)
        case 'phone-hand':
            return (<TiPhoneOutline/>)
        case 'thermometer':
            return (<TiThermometer/>)
        case 'noodles':
            return (<GiNoodles/>)
        case 'cup':
            return (<AiOutlineCoffee/>)
        default:
            return(<IoIosHeart/>)
    }
}