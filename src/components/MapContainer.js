import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapAutoComplete from "./MapAutoComplete";
import HomeMarker from "./HomeMarker";
import MapMarker from "./MapMarker";
import PlaceCard from "./PlaceCard";
import SearchButton from "./SearchButton";
import keys from "../keys";

import { Divider } from "antd";

const coord = { lat: 34.028927, lng: -84.198578 };

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapsLoaded: false,
      markers: new Map(),
      map: {},
      mapsApi: {},
      autoCompleteService: {},
      currentUserLatLng: {},
      placesService: {},
      geoCoderService: {},
      directionService: {},
      searchResults: [],
    };
  }

  apiHasLoaded = (map, mapsApi) => {
    this.setState({
      mapsLoaded: true,
      map,
      mapsApi,
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      currentUserLatLng: new mapsApi.LatLng(coord.lat, coord.lng),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      directionService: new mapsApi.DirectionsService(),
    });
  };

  updateCurrentUserLatLng = (pos) => {
    const { mapsApi } = this.state;
    this.setState({
      currentUserLatLng: new mapsApi.LatLng(pos.lat, pos.lng),
    });
  };

  updateSearchResults = (results) => {
    this.setState({ searchResults: results });
  };

  addSingleMarker = (lat, lng, name, id) => {
    const markers = new Map();
    markers.set(id, { lat, lng, name, id });
    console.log(`Added new "${name}" Marker`);
    this.setState({ markers });
  };

  render() {
    const {
      mapsLoaded,
      map,
      mapsApi,
      autoCompleteService,
      geoCoderService,
      placesService,
      directionService,
      //currentUserLatLng,
      searchResults,
    } = this.state;
    return (
      <div className="MapContainer">
        <div className="w-100 d-flex py-4 flex-wrap justify-content-center">
          <h1 className="w-100 fw-md">Get some Boba!</h1>
          {mapsLoaded ? (
            <div
              className="search"
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem 0rem",
              }}
            >
              <MapAutoComplete
                currentUserLatLng={this.state.currentUserLatLng}
                autoCompleteService={autoCompleteService}
                geoCoderService={geoCoderService}
                //mapsApi={this.state.mapsApi}
                map={map}
                addSingleMarker={this.addSingleMarker}
                updateCurrentUserLatLng={this.updateCurrentUserLatLng}
                //mapsLoaded={this.state.mapsLoaded}
              />
              <SearchButton
                currentUserLatLng={this.state.currentUserLatLng}
                mapsApi={mapsApi}
                placesService={placesService}
                directionService={directionService}
                updateSearchResults={this.updateSearchResults}
              />
            </div>
          ) : null}
          <div
            className="GMapReact"
            style={{
              height: "600px",
              width: "100vw",
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: keys.key,
                libraries: ["places", "directions"],
              }}
              defaultZoom={11}
              defaultCenter={{ lat: coord.lat, lng: coord.lng }}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={({ map, maps }) =>
                this.apiHasLoaded(map, maps)
              }
            >
              {Array.from(this.state.markers.values()).map((marker) => (
                <HomeMarker
                  name={marker.name}
                  key={marker.id}
                  lat={marker.lat}
                  lng={marker.lng}
                />
              ))}
            </GoogleMapReact>
          </div>
          {/* Results section */}
          {searchResults.length > 0 ? (
            <>
              <Divider />
              <div className="d-flex flex-column justify-content-center">
                <h1 className="mb-4 fw-md">Boba Near You!</h1>
                <div className="col-sm d-flex flex-wrap">
                  {searchResults.map((result) => (
                    <PlaceCard info={result} />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default MapContainer;
