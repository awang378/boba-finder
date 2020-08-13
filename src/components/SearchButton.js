import React, { Component } from "react";
import { Button, message } from "antd";

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapsApi: this.props.mapsApi,
      placesService: this.props.placesService,
      directionService: this.props.directionService,
    };
  }

  handleSearch = () => {
    if (!this.props.searchLoaded) {
      const config = {
        content: "Please enter a location.",
      };
      message.error(config);
      return;
    }
    const { mapsApi, placesService, directionService } = this.state;
    const results = [];

    // Places Request
    const placesRequest = {
      location: this.props.currentUserLatLng,
      type: [
        "restaurant",
        "cafe",
        "food",
        "point_of_interest",
        "establishment",
      ],
      query: "boba, bubble tea, milk tea",
      rankBy: mapsApi.places.RankBy.DISTANCE,
    };

    // Search for Boba Places with Places API
    placesService.textSearch(placesRequest, (response) => {
      const responseLimit = Math.min(9, response.length);
      for (let i = 0; i < responseLimit; i++) {
        const bobaPlace = response[i];
        const { name, rating, place_id } = bobaPlace;
        const address = bobaPlace.formatted_address;
        //let openNow = false;
        let photoUrl = "";

        /*
        if (bobaPlace.opening_hours) {
          openNow = bobaPlace.opening_hours.open_now;
        } */
        if (bobaPlace.photos && bobaPlace.photos.length > 0) {
          photoUrl = bobaPlace.photos[0].getUrl();
        }

        // Use Directions API to find travel distance and approx time
        const directionRequest = {
          origin: this.props.currentUserLatLng,
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

          // Get additional details for palces
          const placeDetails = {
            fields: [
              "url",
              "opening_hours",
              "formatted_phone_number",
              "utc_offset_minutes",
            ],
            placeId: place_id,
          };

          placesService.getDetails(placeDetails, (result, status) => {
            if (status !== "OK") {
              return;
            }
            const bobaDetails = result;
            const {
              url,
              formatted_phone_number,
              user_ratings_total,
              opening_hours,
            } = bobaDetails;
            const isOpen = opening_hours.isOpen();
            console.log(isOpen);
            results.push({
              name,
              rating,
              address,
              url,
              user_ratings_total,
              formatted_phone_number,
              isOpen,
              photoUrl,
              distanceText,
              timeText,
            });
            this.props.updateSearchResults(results);
          });
        });

        /* 
        this.addMarker(
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                place.name,
                place.place_id
              );*/
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
