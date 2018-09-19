import React, { Component } from "react";


class VenueDetail extends Component {
  state = {
    imgUrl: [],
    imageErrorMessage: "",
    ratingErrorMessage: "",
    isImageError: false,
    isRatingError: false,
    rating: 0
  };
  componentDidMount() {
    // Call fetchImage and fetchRating methods
    this.fetchImage();
    this.fetchRatings();
  }

  fetchImage = () => {
    let prefix, suffix, url;

    fetch(
      `https://api.foursquare.com/v2/venues/${
        this.props.place.id
      }/photos?limit=1&client_id=WZAFHLFXX3BPD4BZDML1WR5G0MP1VGDV4INB04QN0HVU4TQQ&client_secret=1F0FFNXXAW0DBAB2K3Q0UFH2XZSVBLIMFKY5MUOHZV21F4GB&v=20180804`
    )
      .then(response => {
        if (!response.ok) {
          this.setState({
            isError: true,
            imageErrorMessage:
              "Sorry, there was a problem while loading this restaurant's photo."
          });
          throw response;
        }

        return response.json();
      })
      .then(data => {
        // Proper Image url for Foursquare
        if(data.response.photos.items[0]){
        prefix = data.response.photos.items[0].prefix;
        suffix = data.response.photos.items[0].suffix;
        url = `${prefix}150x150${suffix}`;
        } else {
          url = "./images/restaurant.png";
        }

        this.setState({
          imgUrl: url,
          isImageError: false
        });
      })
      .catch(err => {
        this.setState({
          isImageError: true
        });
        throw err;
      });
  };

  fetchRatings = () => {
    let venueRating;
    fetch(
      `https://api.foursquare.com/v2/venues/${
        this.props.place.id
      }?&client_id=WZAFHLFXX3BPD4BZDML1WR5G0MP1VGDV4INB04QN0HVU4TQQ&client_secret=1F0FFNXXAW0DBAB2K3Q0UFH2XZSVBLIMFKY5MUOHZV21F4GB&v=20180804`
    )
      .then(response => {
        if (!response.ok) {
          this.setState({
            isRatingError: true,
            ratingErrorMessage:
              "Sorry, there was a problem while getting restaurant's rating."
          });
          throw response;
        }

        return response.json();
      })
      .then(data => {
        venueRating = data.response.venue.rating;
        venueRating = (venueRating / 2).toFixed(1);
        this.setState({
          rating: venueRating,
          isRatingError: false
        });
      });
  };
  render() {
    const { place } = this.props;
    const {
      rating,
      imgUrl,
      imageErrorMessage,
      ratingErrorMessage,
      isImageError,
      isRatingError
    } = this.state;

    return (
      <div className="details">
        <hr/>
        <img src={imgUrl} alt={place.name} />
        <p id="rating">Rating: {isNaN(rating) ? "Not voted yet" : rating}</p>
        <hr />
        {/* Show user-friendly error messages in infoWindow */}
        {isImageError && <p className="error-message">{imageErrorMessage}</p>}
        {isRatingError && <p className="error-message">{ratingErrorMessage}</p>}
      </div>
    );
  }
}

export default VenueDetail;
