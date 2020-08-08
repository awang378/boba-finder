import React, { Component } from "react";
import { HomeTwoTone } from "@ant-design/icons";

class HomeMarker extends Component {
  render() {
    return (
      <div className="HomeMarker" key={this.props.key}>
        <HomeTwoTone
          className="icon"
          style={{ fontSize: "20px" }}
          twoToneColor="#eb2f96"
        />
      </div>
    );
  }
}

export default HomeMarker;
