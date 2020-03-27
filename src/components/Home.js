import React, {useState, useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import {MainContext} from './../context';
import {CategoryComponent} from './CategoryComponent';
import {ProductItem} from './ProductItem';
export const Home = () => {

    const contextValues = useContext(MainContext)
    const {setPage} = contextValues.page

    useEffect(() => {
        setPage('home')
    })
    
    return(
        <main className="home">
            <div className="home__categories">
                <div className="home__section_title">
                    <p className="title">Categories</p>
                    <p>
                    <Link className="link" to="/categories">View All</Link>
                    </p>
                </div>
                <div className="home__category">
                    <CategoryComponent icon="house" title="House Holds"/>
                    <CategoryComponent icon="cheese" title="Chilled"/>
                    <CategoryComponent icon="bread" title="Pasteries"/>
                    <CategoryComponent icon="fruit" title="fruit"/>
                </div>
            </div>

            <section className="home__section">
                <div className="home__section_title">
                    <p className="title">Most Ordered</p>
                </div>
                <div className="home__section__item__list">
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                </div>
            </section>

            <section className="home__section">
                <div className="home__section_title">
                    <p className="title">Most Viewed</p>
                </div>
                <div className="home__section__item__list">
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                </div>
            </section>

            <section className="home__section">
                <div className="home__section_title">
                    <p className="title">Recently Added</p>
                </div>
                <div className="home__section__item__list">
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                <ProductItem img="https://cdn.vox-cdn.com/thumbor/1lkbiwsmSbovu-HAyjWeZTcGQo8=/0x0:1920x1280/1200x800/filters:focal(807x487:1113x793)/cdn.vox-cdn.com/uploads/chorus_image/image/57340051/apples_2811968_1920.0.jpg" itemName="some item" itemPrice="500"/>
                </div>
            </section>
        </main>
    )
}