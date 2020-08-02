import React, { Component } from "react";
import { AutoComplete } from "antd";

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      options: [],
      autoCompleteService: this.props.autoCompleteService,
      geoCoderService: this.props.geoCoderService,
      mapsLoaded: this.props.mapsLoaded,
    };
  }

  // Geoencode searched result into marker
  onSelect = (value) => {
    this.state.geoCoderService.geocode({ address: value }, (response) => {
      const { location } = response[0].geometry;
      let lat = location.lat();
      let lng = location.lng();
      const pos = { lat, lng };
      //this.props.addSingleMarker(lat, lng, value, response[0].place_id);
      //map.panTo(pos);
      //this.props.updateCurrentUserLatLng(pos);
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
          const options = response.map((res) => res.description);
          this.setState({ options, suggestions: response });
        }
      });
    }
  };

  render() {
    const { options } = this.state;
    return (
      <div className="MapAutoComplete">
        <AutoComplete
          options={options}
          onSearch={this.handleSearch}
          onSelect={this.onSelect}
          style={{ width: 200 }}
          placeholder="Address"
          disabled={!this.props.mapsLoaded}
        />
      </div>
    );
  }
}

export default AutoComplete;
