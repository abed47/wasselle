import React from 'react';
import {FiPlus, FiMinus} from 'react-icons/fi';
import { useSpring, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-with-gesture'

function Slider({ children }) {
    const [bind, { delta, down }] = useGesture()
    const { x, bg, size } = useSpring({
      x: down ? delta[0] : 0,
      bg: `linear-gradient(120deg, ${delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`,
      size: down ? 1.1 : 1,
      immediate: name => down && name === 'x'
    })
    const avSize = x.interpolate({ map: Math.abs, range: [50, 300], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })
    return (
      <animated.div {...bind()} class="item" style={{ background: bg }}>
        <animated.div class="av" style={{ transform: avSize, justifySelf: delta[0] < 0 ? 'end' : 'start' }} />
        <animated.div class="fg" style={{ transform: interpolate([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`) }}>
          {children}
        </animated.div>
      </animated.div>
    )
  }
let items = [
    {
        imgpath: "https://www.nogarlicnoonions.com/images/uploads/NEWS/grapes%202.jpg",
        title: "grapes",
        itemMeasure: "w",
        itemId: '1',
        unitPrice: '0.5',
        orderedQuantity: '7'
    },
    {
        imgpath: "https://lh3.googleusercontent.com/proxy/jUF-i48DJPX5_ILx-ZbE-4c3rYPl8sy29jTzKlJyALfiftSH1CGvo3egIlKP4YerHsePFMmaYAIhKxXk4Vom0HpLh8zyVu-JgMVDDXgVyLurxGuD3y3HY95GdXyurnL0WzEeZwM5Yu_h6mI_IlLgvu8u",
        title: "chips",
        itemMeasure: "p",
        itemId: '2',
        unitPrice: '500',
        orderedQuantity: '3'
    }
]

export const CartListItem = () => {
    return (
        <div className="cart__item_wrapper">

            <div className="cart__item">
                <div className="cart__item__image" >
                    <img src="https://www.nogarlicnoonions.com/images/uploads/NEWS/grapes%202.jpg"/>
                </div>
                
                <div className="cart__item__details">
                    <span className="item__title" >Grapes</span>
                    <span> L.L 500/kg</span>
                    <div className="item__quantity__controls">
                        <span className="control__add" > <FiMinus/> </span>
                        <span className="control__quantity">7</span>
                        <span className="control__deduce"> <FiPlus/> </span>
                    </div>
                </div>
            </div>

            <div className="cart__item__right">
                
            </div>
        </div>
    )
}