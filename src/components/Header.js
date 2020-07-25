import React from "react";
import Navbar from "react-bootstrap/Navbar";
import image from "../boba.png";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home" style={brandStyle}>
        <img
          alt="Boba"
          src={image}
          width="35"
          height="35"
          className="d-inline-block align-middle"
        />{" "}
        Boba Finder
      </Navbar.Brand>
    </Navbar>
  );
}

const brandStyle = {
  className: "d-flex align-items-center",
};

export default Header;
