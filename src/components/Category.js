import React,{useEffect,useState} from 'react';
import {ProductItem} from './ProductItem';
import {firebase} from './../firebase';
import {ClimbingBoxLoader} from 'react-spinners';
import {ProductView} from './ProductView'
import Modal from 'react-modal';
export const Category = ({match}) => {
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState({isOpen: false,productProps:null})
    const db = firebase.firestore()
    async function getItems(){
        let palceHolerArr = []
        db.collection('items')
        .where('categoryId','==',match.params.id)
        .get()
        .then(items => {
            items.forEach(item => {
                let obj = item.data()
                obj.id = item.id
                palceHolerArr.push(obj)
            })
        }).then(() => {
            setItems(palceHolerArr)
        })
    }
    useEffect(() => {
        getItems()
    },[])

    function showModal(productProps){
        productProps.handleClose = handleClose
        setSelectedItem({isOpen: true, productProps})
    }

    function handleClose(){
        setSelectedItem({isOpen:false,productProps: {}})
    }

    return (
        <div className="category_items">
            <Modal 
            isOpen={selectedItem.isOpen}
            ariaHideApp={false}>
                <ProductView
                selectedItem={selectedItem.productProps}
                />
            </Modal>
        {
            items.length === 0 ?
            (                    
                <div className="sweet-loading">
                    <ClimbingBoxLoader
                    css={`justify-self: center`}
                    size={150}
                    color={"#5CC062"}
                    loading={true}
                    size={18}
                    />
                </div>
            ):
            items.map(item => {
                return  <ProductItem
                handleClick={()=>showModal(item)} 
                key={item.id}
                quantity={item.quantity}
                categoryId={item.categoryId}
                imgPath={item.imgPath}
                imgAlt={item.imgAlt}
                itemName={item.name}
                itemPrice={item.unitPrice}
                itemDesc={item.description}/>
            })
        }
        </div>
    )
}