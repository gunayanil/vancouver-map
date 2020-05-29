import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import ListPlaces from "./ListPlaces";
import escapeRegExp from "escape-string-regexp";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            markers: [],
            markerID: -1,
            newmarkers: []
        };
    }

    componentDidMount() {
        fetch(
            "https://api.foursquare.com/v2/venues/search?ll=49.2827291,-123.1207375&query=restaurant&client_id=ID-HERE&client_secret=SECRET-HEREv=20180804"
        )
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Foursquare failed to load");
                    throw new Error("Foursquare error");
                }
            })
            .then(data => {
                this.setState({
                    places: data.response.venues,
                    markers: data.response.venues,
                    newmarkers: data.response.venues
                });
            })
            .catch(error => {
                alert("The data can't be loaded.");
                console.log("Foursquare error", error);
            });

        // Google Maps Error
        window.gm_authFailure = function () {
            alert("Google maps failed to load!");
        };

        document.getElementById("nav-toggle").focus();

        /********************* */
    }


    openInfo = (e, id) => {
        this.setState({
            markerID: id,
        });
    };

    closeInfo = () => {
        this.setState({
            markerID: -1
        });
    };

    changeMarkers = newValue => {
        if (newValue) {
            const match = new RegExp(escapeRegExp(newValue), "i");
            const newmarkers = this.state.markers.filter(place =>
                match.test(place.name)
            );

            this.setState({
                newmarkers: newmarkers
            });
        } else {
            this.setState({
                newmarkers: this.state.places
            });
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
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=KEY-HERE&v=3"
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
