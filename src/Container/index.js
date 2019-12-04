import React, { Fragment, useEffect, useState } from "react"
import Weather from "../Weather"
import Gallery from "../Gallery"
import API_KEYS from "../.env.js"
import style from "./style.module.css"

export default function Container(props) {
  const [weather, setWeather] = useState()
  const [city, setCity] = useState()

  const { location } = props || {}
  const { latitude, longitude } = location || {}

  const hasCoordinates = !!latitude && !!longitude

  useEffect(() => {
    hasCoordinates &&
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS.openWeather}`
      )
        .then(resp => resp.json())
        .then(data => {
          setWeather(data.weather[0].description)
          setCity(data.name)
        })
  }, [location, latitude, longitude, hasCoordinates])

  return (
    <div className={style.container}>
      {weather && (
        <Fragment>
          <Weather weather={weather} city={city} />
          <Gallery weather={weather} />
        </Fragment>
      )}
    </div>
  )
}
