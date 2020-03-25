import React,{useEffect} from 'react';

export const Category = ({match}) => {
    useEffect(() => {
        console.log(match)
    },[])
    return (
        <div>Category page</div>
    )
}