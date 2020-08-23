import React, { Component } from "react";
import { EnvironmentTwoTone } from "@ant-design/icons";
import { Tooltip } from "antd";

class PlaceMarker extends Component {
  render() {
    return (
      <div className="PlaceMarker" key={this.props.key}>
        <Tooltip title={this.props.name}>
          <EnvironmentTwoTone
            className="icon"
            style={{ fontSize: "20px" }}
            twoToneColor="#cc99ff"
          />
        </Tooltip>
      </div>
    );
  }
}

export default PlaceMarker;
