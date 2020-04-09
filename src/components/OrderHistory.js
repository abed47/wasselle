import React, { useState, useEffect } from 'react';
import {FaRegClock, FaTimesCircle} from 'react-icons/fa'
import { AiOutlineFileDone} from 'react-icons/ai'
import {firebase} from './../firebase';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {ClockLoader} from 'react-spinners'
export const OrderHistory = ({match}) => {
    const [showLoading, setShowLoading] = useState(true)
    const [orderList, setOderList] = useState([]);
    const [noItems, setNoItems] = useState(false)
    let fs = firebase.firestore();
    let ordersRef = fs.collection('orders');
    
    async function getOrders(){
        let placeHolderArr = orderList;
        await ordersRef.where('uid', '==', `${match.params.id}`)
        .orderBy('date','desc')
        .get()
        .then(docs => {
            if(docs.empty){
                setShowLoading(false)
                setNoItems(true)
                return
            }

            docs.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                placeHolderArr.push(obj);
            })
        }).then(() => {
            setOderList(placeHolderArr)
            if(placeHolderArr.length){
                return setShowLoading(false);
            }
            setNoItems(true)
        }).catch(err => {
            console.log(err)
        })
    }

    function getIcon(iconName){
        switch (iconName){
            case 'pending':
                return <FaRegClock />
            case 'done':
                return <AiOutlineFileDone/>
            default:
                return <FaTimesCircle/>
        }
    }
    
    function getDate(date){
        let d = new Date(date);
        let now = new Date().getTime();
        let def = now - date;
        if(def < 60000){
            return `${Math.floor(def/1000)} sec`
        }

        if(def < 3600000){
            let m = Math.floor(def/60000)
            return `${m} min`
        }

        if(def < 86400000){
            let h = Math.floor(def / 3600000)
            return `${h} h`
        }

        if(def > 86400 && def < 604800000){
            let days = Math.floor(def / 86400000);
            return `${days} days`
        }

        return `${d.getDate()} / ${d.getMonth() + 1}`;
        
    }
    useEffect(() => {
        getOrders()
    })

    return(
       <div className="orderhistory">
           <Modal
           ariaHideApp={false}
                style={{
                    content:{
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
                isOpen={showLoading}>
                <ClockLoader size={'60px'} color={'#5cc062'}/>
           </Modal>

           {
               !noItems ? null : (<span className="empty__page">no Itmes</span>)
           }

           {
               !orderList.length ? null :
               orderList.map(item => {
               return <Link to={`/orderView/${item.id}`} key={item.id} className="orderhistory__item">
                        <span className="orderhistory__item__id">{item.id.substring(0,5)} ...</span>
                        <span className="orderhistory__item__date">{getDate(item.date)}</span>
                        <span className="orderhistory__item__status">{item.status} {getIcon(item.status)}</span>
                    </Link>
               })
           }
       </div>
    )
}