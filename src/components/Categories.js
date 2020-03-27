import React,{useState, useEffect, useContext} from 'react';
import {CategoryListItem} from './CategoryListItem';
import {MainContext} from './../context';
import {firebase} from './../firebase';
export const Categories = () => {
    const db = firebase.firestore();
    const contextValues = useContext(MainContext);
    const {setPage} = contextValues.page
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        setPage('categories')
        
    })
    return(
        <div className="categories">
            <CategoryListItem iconName="bottle" title="Test Icon" />
        </div>
    )
}