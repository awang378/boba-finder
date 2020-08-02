import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import keys from "../keys";

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 34.028927,
      lng: -84.198578,
    },
    zoom: 11,
  };
  apiHasLoaded = (map, mapsApi) => {
    this.setState({
      //mapsLoaded: true,
      //map,
      mapsApi,
      //singaporeLatLng: new mapsApi.LatLng(SG_COOR.lat, SG_COOR.lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      //geoCoderService: new mapsApi.Geocoder(),
      //directionService: new mapsApi.DirectionsService(),
    });
  };

  render() {
    return (
      <div className="w-100 d-flex py-4 flex-wrap justify-content-center">
        <h1 className="w-100 fw-md">Get some Boba!</h1>
        <div className="GMapReact" style={{ height: "50vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: keys.key,
              libraries: ["places", "directions"],
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          ></GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default MapContainer;
