import React,{useState, useEffect, useContext} from 'react';
import {CategoryListItem} from './CategoryListItem';
import {MainContext} from './../context';
import {firebase} from './../firebase';
import {ClimbingBoxLoader} from 'react-spinners';
export const Categories = () => {
    const db = firebase.firestore();
    const contextValues = useContext(MainContext);
    const {setPage} = contextValues.page
    const [categories, setCategories] = useState([])
    
    async function getCategories(){
        let placeHolderArray = [];
        await db.collection('categories')
        .get()
        .then(snapshot => {
            snapshot.forEach(item => {
                let obj = item.data();
                obj.id = item.id
                placeHolderArray.push(obj)
        })})
        .then(() => {
            setCategories(placeHolderArray)
        })
    }
    useEffect(() => {
        setPage('categories')
        getCategories()
    },[])

    return(
        <div className="categories">
            {
                categories.length === 0 ?
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
                 ) :
                categories.map(category => {
                    return(<CategoryListItem key={category.id} iconName={category.iconName} title={category.name} id={category.id} />)
                })
            }
        </div>
    )
}