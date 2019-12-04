import React, { useState, useEffect } from 'react';
import Container from './Container'
import './App.css';

// const initialLocationState = {
//   latitude: null,
//   longitude: null
// };

function App() {
  const [location, setLocation] = useState();


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handlePosition)
  }, []) //TODO: call useEffect when there has been a change in location.

  const handlePosition = e => {
    setLocation({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
    });
  }

  return (
    <Container location={location} />
  )
}

export default App;
