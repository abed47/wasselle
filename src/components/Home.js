import React, {useState, useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import {MainContext} from './../context';
import {CategoryComponent} from './CategoryComponent';
import {firebase} from './../firebase';
import {Preloader} from './Preloader';
import Modal from 'react-modal';
import {ProductView} from './ProductView';
import {ProductItem} from './ProductItem';

export const Home = () => {
    let fs = firebase.firestore();
    const contextValues = useContext(MainContext)
    const {setPage} = contextValues.page
    const [mOrdered,setMOrdered] = useState([]);
    const [mViewd, setMViewed] = useState([]);
    const [rAdded, setRAdded] = useState([]);
    const [selectedItem, setSelectedItem] = useState({isOpen: false,productProps:null})
    const [isloading, setIsLoading] = useState(true);
    const [categories,setCategories] = useState([])

    async function getData(){
        let ref = fs.collection("items");
        let catRef = fs.collection('categories')
        let mostVItems = mViewd;
        let mostOItems = mOrdered;
        let rAddedItems = rAdded;
        let catHolder = categories;

        await catRef
        .where('isFeatured','==',true)
        .get()
        .then(docs => {
            docs.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                catHolder.push(obj);
            })
        }).then(() => {
            setCategories(catHolder)
        })

        await ref
        .where('isMostO','==', true)
        .limit(10)
        .get()
        .then(async docs => {
            await docs.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                mostOItems.push(obj);
            })
        }).then(() => {
            setMOrdered(mostOItems)
        }).catch(err => {
            console.log(err)
        })

        await ref
        .where('isMostV', '==', true)
        .limit(10)
        .get()
        .then(async docs => {
            await docs.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                mostVItems.push(obj);
            })
        }).then(() => {
            setMViewed(mostVItems)
        }).catch(err => {
            console.log(err)
        })

        await ref
        .where('isNew', '==', true)
        .limit(10)
        .get()
        .then(async docs => {
            await docs.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                rAddedItems.push(obj);
            })
            setRAdded(rAddedItems)

        }).then(() => {
        }).catch(err => {
            console.log(err)
        })
        setIsLoading(false)
    }

    function showModal(productProps){
        productProps.handleClose = handleClose
        setSelectedItem({isOpen: true, productProps})
    }

    function handleClose(){
        setSelectedItem({isOpen:false,productProps: {}})
    }

    useEffect(() => {
        getData()
        setPage('home')
    })
    
    return(
        <main className="home">
            <Modal 
            isOpen={selectedItem.isOpen}
            ariaHideApp={false}>
                <ProductView
                selectedItem={selectedItem.productProps}
                />
            </Modal>
            {
                isloading ?
                <Preloader /> : <>
                    <div className="home__categories">
                    <div className="home__section_title">
                        <p className="title">Categories</p>
                        <p>
                        <Link className="link" to="/categories">View All</Link>
                        </p>
                    </div>
                    <div className="home__category">
                        {
                            categories.map(item => {
                                return <CategoryComponent key={item.id} icon={item.iconName} title={item.name} id={item.id}/>
                            })
                        }
                    </div>
                </div>
    
                <section className="home__section">
                    <div className="home__section_title">
                        <p className="title">Most Ordered</p>
                    </div>
                    <div className="home__section__item__list">
                        {
                            mOrdered.map(item => {
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
                </section>
    
                <section className="home__section">
                    <div className="home__section_title">
                        <p className="title">Most Viewed</p>
                    </div>
                    <div className="home__section__item__list">
                        {
                            !mViewd.length ? <div></div> :
                            mViewd.map(item => {
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
                </section>
    
                <section className="home__section">
                    <div className="home__section_title">
                        <p className="title">Recently Added</p>
                    </div>
                    <div className="home__section__item__list">
                        {
                                rAdded.map(item => {
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
                </section>
                </>
            }
        </main>
    )
}