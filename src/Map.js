import React from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";

const mystyle = require("./style.json");

const Map = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultOptions={{ styles: mystyle }}
			aria-labelledby={`Vancouver Restaurants Map`}
			defaultZoom={14}
			defaultCenter={{ lat: 49.2827291, lng: -123.1207375 }}
		>
			{props.markers.map(restaurant => {
				let marker = (
					<Marker
						aria-labelledby={`${restaurant.name} marker`}
						id={restaurant.id}
						key={restaurant.id}
						name={restaurant.name}
						position={{
							lat: restaurant.location.lat,
							lng: restaurant.location.lng
						}}
						address={restaurant.location.address}
						defaultAnimation={window.google.maps.Animation.DROP}
						onClick={e => {
							props.openInfoHandler(e, restaurant.id);
						}}
						animation={
							props.markerID === restaurant.id &&
							window.google.maps.Animation.BOUNCE
						}
					>
						{props.markerID === restaurant.id && (
							<InfoWindow
								onCloseClick={e => {
									props.closeInfoHandler();
								}}
							>
								<div
									className="info-window"
									tabIndex={0}
									aria-labelledby={`${
										restaurant.name
									} information`}
								>
									<p className="restaurant-name">
										{restaurant.name}
									</p>
									<p className="restaurant-address">
										{restaurant.location.address}
									</p>
								</div>
							</InfoWindow>
						)}
					</Marker>
				);
				return marker;
			})}
		</GoogleMap>
	))
);

export default Map;
