import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
export class PermissionsComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            redirectToMap: false
        }
    }



    getPermissions(){
        navigator.permissions.query({name: 'geolocation'}).then(res => {
            if (res.state === 'granted') {
                navigator.geolocation.getCurrentPosition((res) => {
                    if(res.coords){
                        let coords = {
                            lat: res.coords.latitude,
                            lng: res.coords.longitude
                        }
                        localStorage.setItem('coords', JSON.stringify(coords));
                        localStorage.setItem('location-permission',true);
                        this.setState({redirectToMap: true})
                    }
                })
              } else if (res.state === 'prompt') {
                if(res.coords){
                    let coords = {
                        lat: res.coords.latitude,
                        lng: res.coords.longitude
                    }
                    localStorage.setItem('coords', JSON.stringify(coords));
                    localStorage.setItem('location-permission',true);
                    this.setState({redirectToMap: true})
                }

              } else if (res.state === 'denied') {
                  this.setState({redirect: true})
              }
        })
    }


    render(){
        return(

              
            <div className="permissions">
                {
                    this.state.redirect ? <Redirect to="/selectStore"/> : null
                }
                {
                    this.state.redirectToMap ? <Redirect to="/map"/> : null
                }
            <div className="permissions__text">
                Click on allow to let the app get your location and list neerby stores
            </div>

            <button onClick={() => this.getPermissions()} className="button__confirm">Continue</button>
            </div>
        )
    }
}

export default PermissionsComponent;