import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import {Redirect} from 'react-router-dom'
import Icn from './../assets/images/logo-no-bg.svg';
let coords = null;
let jCoords = null;
export class LocationComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            showSelect: false,
            redirect: false
        }
    }

    componentWillMount(){
        coords = localStorage.getItem('coords');
        jCoords = JSON.parse(coords)
    }
    
    selectMarket(i){
        console.log(i)
    }

    selectStore(){
        localStorage.setItem('selected-store','new')
        //TODO: redirect fix state
        this.setState({redirect: true})
    }
  render() {
      
     return (

      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDR9jPnqKadrINQ4auhI14oZvmTTbJHdM4"
      >
        {
            coords === null || coords === undefined ? <Redirect to="/getPermissions"/> : null
        }
        {
            this.state.redirect ? <Redirect to="/"/> : null
        }
        <GoogleMap
        mapContainerClassName="masp"
        onLoad={map => {
            console.log(map.getCenter())
        }}
        onClick={() => this.setState({showSelect: false})}
        zoom={14}
        center={{lat:jCoords.lat,lng:jCoords.lng}}
        onUnmount={map => {
            // do your stuff before map is unmounted
        }}
        position={{lat:-43.8041,lng:-120.542}}
          id='example-map'
        >

            <InfoWindow
            className="marker"
            position={{lat:jCoords.lat+0.003,lng:jCoords.lng-0.006}}s
            >
                <div onClick={() => this.setState({showSelect: !this.state.showSelect})} className="marker">
            <img src={Icn}/>
            <p>store name</p>
            </div>
            </InfoWindow>

            <span className="map"></span>
            <div className={`confirm_modal ${this.state.showSelect ? 'active' : null}`}>
                <div className="info">
                <img src={Icn}/>
                <p>Store Name</p>
                </div>
                <button onClick={() => this.selectStore()} className="button__confirm">Select</button>
            </div>
        </GoogleMap>
      </LoadScript>
     )
  }
}