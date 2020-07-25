import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
