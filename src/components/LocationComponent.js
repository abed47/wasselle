import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

export class LocationComponent extends Component {
    
  render() {
      
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDR9jPnqKadrINQ4auhI14oZvmTTbJHdM4"
      >
        <GoogleMap
        mapContainerClassName="masp"
        onLoad={map => {
            console.log(map.getCenter())
        }}
        zoom={14}
        center={{lat:33.5571,lng:35.3729}}
        onUnmount={map => {
            // do your stuff before map is unmounted
        }}
        position={{lat:-43.8041,lng:-120.542}}
          id='example-map'
        >
            <span className="map"></span>
        </GoogleMap>
      </LoadScript>
     )
  }
}