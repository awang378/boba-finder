import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import keys from "../keys";

//const SG_COOR = { lat: 1.3521, lng: 103.8198 };

class MapContainer extends Component {
  // Runs once when the Google Maps library is ready
  // Initializes all services that we need
  apiHasLoaded = (map, mapsApi) => {
    this.setState({
      mapsLoaded: true,
      map,
      mapsApi,
      //singaporeLatLng: new mapsApi.LatLng(SG_COOR.lat, SG_COOR.lng),
      //autoCompleteService: new mapsApi.places.AutocompleteService(),
      //placesService: new mapsApi.places.PlacesService(map),
      //geoCoderService: new mapsApi.Geocoder(),
      //directionService: new mapsApi.DirectionsService(),
    });
  };
  render() {
    return (
      <section className="h-lg">
        <GoogleMapReact
          boostrapURLkeys={{
            key: keys.key,
            libraries: ["places", "directions"],
          }}
          defaultZoom={11}
          defaultCenter={{ lat: 34.028927, lng: -84.198578 }}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        ></GoogleMapReact>
      </section>
    );
  }
}
/*
const mapStyle = {
  height: "35rem",
}; */

export default MapContainer;
