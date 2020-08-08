import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MapContainer from "./components/MapContainer";
import Header from "./components/Header";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="container">
        <MapContainer />
      </header>
    </div>
  );
}

export default App;
