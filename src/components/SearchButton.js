import React, { Component } from "react";
import { Button } from "antd";

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapsApi: this.props.mapsApi,
      placesService: this.props.placesService,
      currentUserLatLng: this.props.currentUserLatLng,
      directionService: this.props.directionService,
      searchResults: [],
    };
  }

  handleSearch = () => {
    const {
      mapsApi,
      placesService,
      currentUserLatLng,
      directionService,
    } = this.state;
    const results = [];

    // Places Request
    const placesRequest = {
      location: currentUserLatLng,
      type: ["restaurant", "cafe", "food"],
      query: "boba, bubble tea, milk tea",
      rankBy: mapsApi.places.RankBy.DISTANCE,
    };

    // Search for Boba Places with Places API
    placesService.textSearch(placesRequest, (response) => {
      const responseLimit = Math.min(9, response.length);
      for (let i = 0; i < responseLimit; i++) {
        const bobaPlace = response[i];
        const { name, rating, price_level, url } = bobaPlace;
        const address = bobaPlace.formatted_address;
        let openNow = false;
        let photoUrl = "";

        if (bobaPlace.opening_hours) {
          openNow = bobaPlace.opening_hours.open_now;
        }
        if (bobaPlace.photos && bobaPlace.photos.length > 0) {
          photoUrl = bobaPlace.photos[0].getUrl();
        }

        // Use Directions API to find travel distance and approx time
        const directionRequest = {
          origin: currentUserLatLng,
          destination: address,
          travelMode: "DRIVING",
        };

        directionService.route(directionRequest, (result, status) => {
          if (status !== "OK") {
            return;
          }
          const travelRoute = result.routes[0].legs[0];
          const timeText = travelRoute.duration.text;
          const distanceText = travelRoute.distance.text;
          results.push({
            name,
            rating,
            address,
            openNow,
            price_level,
            photoUrl,
            distanceText,
            timeText,
            url,
          });
        });

        /* 
        this.addMarker(
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                place.name,
                place.place_id
              );*/

        this.setState({ searchResults: results });
      }
    });
  };
  render() {
    return (
      <Button
        type="primary"
        onClick={this.handleSearch}
        //disabled={!this.state.mapsLoaded}
      >
        Find Boba
      </Button>
    );
  }
}

export default SearchButton;
