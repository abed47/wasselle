import React,{useContext,useEffect, useState} from 'react';
import {MainContext} from './../context';
import { Link, useHistory } from 'react-router-dom';
import {firebase} from './../firebase';
import Modal from 'react-modal';
import {ClockLoader} from 'react-spinners'
import {FaExclamationTriangle} from 'react-icons/fa'

export const CheckOutPage = () => {
    const contextValues = useContext(MainContext);
    const {setPage} = contextValues.page;
    const {UserObject} = contextValues.user
    const {cart,setCart} = contextValues.cart
    const [user, setUser] = useState({});
    const history = useHistory();
    const [nameError, setNameError] = useState(false)
    const [streetError, setStreetError] = useState(false)
    const [buildingError, setBuildingError] = useState(false)
    const [floorError, setFloorError] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    let [streetName, setStreetName] = useState('')
    let [buildingName, setBuildingName] = useState('')
    let [floorName, setFloorName] = useState('')

    async function checkout(){
        let fs = firebase.firestore();
        let ref = await fs.collection('users')
        let ordersRef = await fs.collection('orders');
        setShowLoading(true)
        ref
        .doc(user.uid)
        .get()
        .then(async doc => {
            if(doc.exists){
                let order = {
                    cart: JSON.stringify(cart),
                    date: new Date().getTime(),
                    status: 'pending',
                    uid: user.uid
                }

                await ordersRef.add(order).then(v => {
                    setShowLoading(false)
                    setCart([])
                    return history.push('/profile')
                }).catch(err => {
                    setShowError(true)
                    setTimeout(() => {
                        setShowError(false);
                        history.push('/cart')
                    },2000)
                })
                return
            }

            await ref.doc(user.uid).set(user).then(async v => {
                let order = {
                    cart: JSON.stringify(cart),
                    date: new Date().getTime(),
                    status: 'pending',
                    uid: user.uid
                }
                await ordersRef.add(order).then(v => {
                    setShowLoading(false)
                    setCart([])
                    return history.push('/profile')
                }).catch(err => {
                    setShowError(true)
                    setTimeout(() => {
                        setShowError(false);
                        history.push('/cart')
                    },2000)
                })
            }).catch(err => {
                setShowError(true)
                setTimeout(() => {
                    setShowError(false);
                    history.push('/cart')
                },2000)
            })
            
        }).catch(err => {
            setShowError(true)
            setTimeout(() => {
                setShowError(false);
                history.push('/cart')
            },2000)
        })
    }

    function validate(){
        if(!user.uid){
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if(!user.displayName && !displayName){
            return setNameError(true)
        }
        setNameError(false)

        if(!user.street && !streetName){
            return setStreetError(true)
        }
        setStreetError(false)

        if(!user.building && !buildingName){
            return setBuildingError(true)
        }
        setBuildingError(false)

        if(!user.floor && !floorName){
            return setFloorError(true)
        }
        setFloorError(false)

        if(!user.phoneNumber){
            alert('please login')
            return history.push('/profile')
        }

        let u = JSON.parse(localStorage.getItem('user'))
        if(!u.displayName || !u.floor || !u.building || !u.street){
            u.displayName = displayName;
            u.floor = floorName;
            u.building = buildingName;
            u.street = streetName;
            localStorage.setItem('user', JSON.stringify(u))
            return checkout()
        }
        checkout()
    }

    function getCartTotal(arr){
        let total  = 0;
        if(arr.length < 1){
            return total;
        }

        arr.forEach(item => {
            total = total + (item.orderedQuantity * item.unitPrice)
        })
        
        return total;
    }

    useEffect(() => {
        if(UserObject){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        setPage('checkout')
    },[]);

    return(
        <div className="checkout">   
        <Modal 
        ariaHideApp={false}
        style={{
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        }} 
        isOpen={showLoading}>
            <ClockLoader size={'60px'} color={'#5cc062'}/>
        </Modal>

        <Modal
            ariaHideApp={false}
            style={{
                content : {
                    top                   : '50%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    transform             : 'translate(-50%, -50%)'
                }
            }} 
            isOpen={showError}
        >
            <FaExclamationTriangle/>
        </Modal>
            <div className="checkout__container">
                <div className="checkout__items">
                    
                    {
                        cart.map(item => {
                            return (
                                <div key={item.itemId} className="checkout__item">
                                    <span className="item__name">{item.name}</span>
                                    <span className="item__quantity">x {item.orderedQuantity}</span>
                                    <span className="item__price">{item.orderedQuantity * item.unitPrice} L.L</span>
                                </div>
                            )
                        })
                    }

                </div>
                <span className="checkout__user">
                    {
                        user.displayName ? user.displayName :
                        <span className="checkout__input__group">
                            {
                                nameError ? <span className="error__message" >*field required</span> : null
                            }
                            <label className="d-block">name:</label>
                            <input type="text" value={displayName} onChange={(e) => {
                                e.preventDefault() 
                                setDisplayName(e.target.value)
                                }}/>
                        </span>
                    }
                </span>
                <span className="checkout__phone">
                    {
                        user.phoneNumber ? user.phoneNumber :
                        <span className="checkout__input__group">
                            <Link className="button__primary__outline" to="/profile">Login</Link>
                        </span>
                    }
                </span>

                {
                    user.street ? user.street:
                    (
                        <span className="checkout__input__group">
                            {
                                streetError ? (<span className="error__message">*field required</span>) : null
                            }
                            <label className="d-block">street:</label>
                            <input value={streetName} onChange={ e => {
                                e.preventDefault();
                                setStreetName(e.target.value)
                            }} />
                        </span>
                    )
                }

                {
                    user.building ? user.building :
                    (
                        <span className="checkout__input__group">
                            {
                                buildingError ? (<span className="error__message">*field required</span>) : null
                            }
                            <label className="d-block">building:</label>
                            <input value={buildingName} onChange={e => {
                                e.preventDefault();
                                setBuildingName(e.target.value)
                            }}/>
                        </span>
                    )
                }

                {
                    user.floor ? user.floor : 
                    (
                        <span className="checkout__input__group">                            
                            {
                                floorError ? (<span className="error__message">*field required</span>) : null
                            }
                            <label className="d-block">floor:</label>
                            <input value={floorName} onChange={e => {
                                e.preventDefault();
                                setFloorName(e.target.value)
                            }}/>
                        </span>
                    )
                }

                <span className="checkout__total d-block"> {getCartTotal(cart)} L.L</span>
                <button className="button__confirm d-block" onClick={() => validate()}>Cofirm</button>
            </div>
        </div>
    )
}