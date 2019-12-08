import React, { useState, useEffect } from "react";
import Container from "./Container";
import "./App.css";

function App() {
  const [location, setLocation] = useState();

  useEffect(() => {
    // const options = {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // };

    navigator.geolocation.getCurrentPosition(
      handlePosition
      // handleError,
      // options
    );
  }, []); //TODO: call useEffect when there has been a change in location.

  const handlePosition = e => {
    setLocation({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude
    });
  };

  const handleError = e => {
    console.log("e", e);
  };

  return <Container location={location} setLocation={setLocation} />;
}

export default App;
