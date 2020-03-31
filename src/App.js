import React, { useState, useEffect } from "react"
import Container from "./Container"

const initialLocation = {
  latitude: 40.68,
  longitude: -73.97
}

function App() {
  const [location, setLocation] = useState(initialLocation)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handlePosition)
  }, []) //TODO: call useEffect when there has been a change in location.

  const handlePosition = e => {
    setLocation({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude
    })
  }

  return <Container location={location} setLocation={setLocation} />
}

export default App
