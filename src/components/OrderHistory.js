import React, { useState } from 'react';
import {FaRegClock, AiOutlineFileDone} from 'react-icons/fa'
import {FaExclamationTriangle} from 'react-icons/fa'
import {AiOutlineAlert} from 'react-icons/ai'
import {firebase} from './../firebase';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {ClockLoader} from 'react-spinners'
export const OrderHistory = ({match}) => {
    const [showLoading, setShowLoading] = useState(true)
    let fs = firebase.firestore();
    return(
       <div>
           <Modal
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
       </div>
    )
}