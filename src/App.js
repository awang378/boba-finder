import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/antd/dist/antd.css";
import "./App.css";
import MapContainer from "./components/MapContainer";
import Header from "./components/Header";

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
