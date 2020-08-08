import React, { Component } from "react";
import { AutoComplete } from "antd";

class MapAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map,
      //mapsApi: this.props.mapsApi,
      suggestions: [],
      options: [],
      updateCurrentUserLatLng: this.props.updateCurrentUserLatLng,
      autoCompleteService: this.props.autoCompleteService,
      geoCoderService: this.props.geoCoderService,
      //mapsLoaded: this.props.mapsLoaded,
      currentUserLatLng: this.props.currentUserLatLng,
    };
  }

  // Geoencode searched result into marker
  onSelect = (value) => {
    const { map } = this.state;
    this.state.geoCoderService.geocode({ address: value }, (response) => {
      const { location } = response[0].geometry;
      let lat = location.lat();
      let lng = location.lng();
      const pos = { lat, lng };
      this.props.addSingleMarker(lat, lng, value, response[0].place_id);
      map.panTo(pos);
      this.props.updateCurrentUserLatLng(pos);
    });
  };

  // Autocomplete Search Results
  onSearch = (value) => {
    const { autoCompleteService, currentUserLatLng } = this.state;
    if (value.length > 0) {
      const searchQuery = {
        input: value,
        location: currentUserLatLng,
        radius: 30000,
      };
      autoCompleteService.getQueryPredictions(searchQuery, (response) => {
        if (response) {
          const options = response.map((resp) => {
            return { ...resp, value: resp.description };
          });
          this.setState({ options, suggestion: response });
        }
      });
    }
  };

  render() {
    const { options } = this.state;
    return (
      <div
        className="MapAutoComplete"
        style={{
          display: "flex",
          flexDirection: "horizontal",
          margin: "0px 0.5rem",
        }}
      >
        <AutoComplete
          style={{
            width: "600px",
            display: "flex",
            flexGrow: 1,
          }}
          options={options}
          onSearch={this.onSearch}
          onSelect={this.onSelect}
          placeholder="Enter Your Address"
          //disabled={!this.props.mapsLoaded}
        />
      </div>
    );
  }
}

export default MapAutoComplete;
