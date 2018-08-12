import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import ListPlaces from "./ListPlaces";
import * as _ from "lodash";
import escapeRegExp from "escape-string-regexp";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            markers: [],
            markerID: -1,
            newmarkers: [],
        };
    }

    componentDidMount() {
        fetch(
            "https://api.foursquare.com/v2/venues/search?ll=49.2827291,-123.1207375&query=restaurant&limit=7&client_id=WZAFHLFXX3BPD4BZDML1WR5G0MP1VGDV4INB04QN0HVU4TQQ&client_secret=1F0FFNXXAW0DBAB2K3Q0UFH2XZSVBLIMFKY5MUOHZV21F4GB&v=20180804"
        )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    places: data.response.venues,
                    markers: data.response.venues,
                    newmarkers: data.response.venues
                });
            })
            .catch(error => {
                console.log("Someting went wrong ", error);
            });

            document.getElementById('nav-toggle').focus();       
    }

    openInfo = (e, id) => {
        this.setState({
            markerID: id
        });
    };

    closeInfo = () => {
        this.setState({
            markerID: -1
        });
    };


    changeMarkers = newValue =>  {
        if(newValue) {
        const match = new RegExp(escapeRegExp(newValue), "i");
        const newmarkers = this.state.markers.filter(
             place => match.test(place.name)
         );

        this.setState({
            newmarkers: newmarkers,
        });

    } else {
        this.setState({
            newmarkers: this.state.places
        })
        }
    };

    toggleListPlaces = () => {
        const nav = document.getElementById("nav-toggle");
        const body = document.getElementsByTagName("body")[0];

        nav.classList.toggle("active");

        if (body.classList.contains("show-nav")) {
            body.classList.remove("show-nav");
        } else {
            body.classList.add("show-nav");
        }
    };


    render() {
        return (
            <div className="App">
                <Map
                    role="application"
                    places={this.state.places}
                    markers={this.state.newmarkers}
                    openInfoHandler={this.openInfo}
                    closeInfoHandler={this.closeInfo}
                    markerID={this.state.markerID}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBiE_oUg0mzVJbxj39WchHpyEO--o_rFQ&v=3"
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                />
                <ListPlaces
                    toggleListHandler={this.toggleListPlaces}
                    locations={this.state.places}
                    openInfoHandler={this.openInfo}
                    changeMarkersHandler={this.changeMarkers}
                    focusIcon={this.focusIcon}
                />
            </div>
        );
    }
}

export default App;