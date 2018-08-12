import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";

class ListPlaces extends Component {
	state = {
		searchQuery: ""
	};

	updateQuery = query => {
		this.setState({ searchQuery: query });
		this.props.changeMarkersHandler(query);
	};

	render() {
		const {
			toggleListHandler,
			locations,
			openInfoHandler,
			focusIcon
		} = this.props;

		let showLocations;
		if (this.state.searchQuery) {
			const match = new RegExp(escapeRegExp(this.state.searchQuery), "i");
			showLocations = locations.filter(location =>
				match.test(location.name)
			);
		} else {
			showLocations = locations;
		}

		return (
			<div>
				<aside arialabelledby="Restaurants List" tabIndex="0">
					<h2>Vancouver Restaurants</h2>
					<nav>
						<div className="search-area">
							<input
								arialabel="Search Restaurant"
								className="search-input"
								type="text"
								placeholder="Search Restaurant"
								value={this.state.searchQuery}
								onChange={e => this.updateQuery(e.target.value)}
								tabIndex="0"
							/>
						</div>
						<ul>
							{showLocations.map(location => {
								return (
									<li
										key={location.id}
										onClick={e =>
											openInfoHandler(e, location.id)
										}
										tabIndex="0"
									>
										{location.name}
									</li>
								);
							})}
						</ul>
					</nav>
					<p>Information provided by Foursquare</p>
				</aside>
				<a
					onClick={toggleListHandler}
					id="nav-toggle"
					className="position"
					tabIndex="0"
				>
					<span />
				</a>
			</div>
		);
	}
}

export default ListPlaces;
