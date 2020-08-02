import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import image from "../boba.png";

class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt="Boba"
            src={image}
            width="35"
            height="35"
            className="d-inline-block align-bottom"
          />
          Boba Finder
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end align-bottom">
          <Navbar.Text>
            Checkout the{" "}
            <a href="https://github.com/awang378/boba-finder">Repo</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
