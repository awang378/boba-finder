import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapAutoComplete from "./MapAutoComplete";
import HomeMarker from "./HomeMarker";
import PlaceMarker from "./PlaceMarker";
import PlaceCard from "./PlaceCard";
import SearchButton from "./SearchButton";
import { Divider } from "antd";
import keys from "../keys";

const coord = { lat: 34.028927, lng: -84.198578 };

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapsLoaded: false,
      markers: new Map(),
      map: {},
      mapsApi: {},
      searchLoaded: false,
      autoCompleteService: {},
      currentUserLatLng: {},
      placesService: {},
      geoCoderService: {},
      directionService: {},
      searchResults: [],
      placeMarkers: [],
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

  addPlaces = (lat, lng, name, id) => {
    const prevMarkers = this.state.placeMarkers;
    const placeMarkers = Object.assign([], prevMarkers);
    placeMarkers.push({ lat, lng, name, id });
    console.log(`Added new "${name}" Marker`);
    this.setState({ placeMarkers });
  };

  clearMarkers = () => {
    this.setState({ placeMarkers: [] });
  };

  updateSearchResults = (results) => {
    this.setState({ searchResults: results });
  };

  searchHasLoaded = () => {
    this.setState({ searchLoaded: true });
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
                padding: "0.5rem 0rem 1.0rem 5.0rem ",
                alignItems: "center",
              }}
            >
              <MapAutoComplete
                currentUserLatLng={this.state.currentUserLatLng}
                autoCompleteService={autoCompleteService}
                geoCoderService={geoCoderService}
                searchLoaded={this.searchHasLoaded}
                map={map}
                addSingleMarker={this.addSingleMarker}
                updateCurrentUserLatLng={this.updateCurrentUserLatLng}
              />
              <SearchButton
                currentUserLatLng={this.state.currentUserLatLng}
                mapsApi={mapsApi}
                addPlaces={this.addPlaces}
                searchLoaded={this.state.searchLoaded}
                placesService={placesService}
                directionService={directionService}
                updateSearchResults={this.updateSearchResults}
                clearMarkers={this.clearMarkers}
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
              defaultZoom={12}
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
              {this.state.placeMarkers.map((marker) => {
                const { name, lat, lng, id } = marker;
                return <PlaceMarker key={id} name={name} lat={lat} lng={lng} />;
              })}
            </GoogleMapReact>
          </div>

          {searchResults.length > 0 ? (
            <>
              <Divider />
              <div className="d-flex flex-column container-fluid justify-content-center">
                <h1 className="w-100 fw-md">Boba Near You!</h1>
                <div className="row justify-content-md-center">
                  {searchResults.map((result, key) => (
                    <PlaceCard info={result} key={key} />
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
