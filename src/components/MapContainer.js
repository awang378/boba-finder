import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapAutoComplete from "./MapAutoComplete";
import HomeMarker from "./HomeMarker";
import MapMarker from "./MapMarker";
import { Button } from "antd";
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
      autoCompleteService: {},
      currentUserLatLng: {},
      placesService: {},
      geoCoderService: {},
      directionService: {},
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
      autoCompleteService,
      geoCoderService,
      currentUserLatLng,
    } = this.state;
    return (
      <div className="MapContainer">
        <section className="w-100 d-flex py-4 flex-wrap justify-content-center">
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
                currentUserLatLng={currentUserLatLng}
                autoCompleteService={autoCompleteService}
                geoCoderService={geoCoderService}
                //mapsApi={this.state.mapsApi}
                map={map}
                addSingleMarker={this.addSingleMarker}
                updateCurrentUserLatLng={this.updateCurrentUserLatLng}
                //mapsLoaded={this.state.mapsLoaded}
              />
              <Button
                type="primary"
                //onClick={this.handleSearch}
                //disabled={!this.state.mapsLoaded}
              >
                Find Boba
              </Button>
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
        </section>
      </div>
    );
  }
}

export default MapContainer;
