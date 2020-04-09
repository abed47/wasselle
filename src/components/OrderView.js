import React, {useState, useEffect} from 'react';
import {firebase} from './../firebase';
import {useHistory} from 'react-router-dom';
import {ClockLoader} from 'react-spinners'
import Modal from 'react-modal';

export const OrderView = ({match}) => {
    let fs = firebase.firestore();
    const history = useHistory();
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    
    async function getData(){
        let ref = await fs.collection('orders');
        await ref.doc(match.params.id).get().then(doc => {
            setShowLoading(false);
            setData(doc.data())
        }).catch(err => {
            setShowLoading(false);
            setTimeout(() => {
                history.push('/profile');
            },2000)
        })
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

    function computeTotal(items){
        let total = 0;
        if(!items.length){
            return total;
        }

        items.forEach(item => {
            total = total + (item.unitPrice * item.orderedQuantity)
        })

        return total;
    }

    useEffect(() => {
        getData()
    })
    return (
        <div className="order__view">
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
                !data.uid ?
                <div>no data</div> :
                <div className="order__view__data">
                    {
                        JSON.parse(data.cart).map(item => {
                            return <span key={item.itemId} className="order__view__data__list__item">
                                        <img src={item.imgPath} alt="item img" />
                                        <span>{item.name}</span>
                                        <span>x{item.orderedQuantity}</span>
                                        <span>{item.unitPrice}</span>
                                    </span>
                        })
                    }
                    <span className="order__view__data__total">total: {computeTotal(JSON.parse(data.cart))} L.L</span>
                    <span className="order__view__data__date">ordered: {getDate(data.date)} ago</span>
                </div>
            }
        </div>
    )
}