import React, { useEffect, useState } from "react";
import Weather from "../Weather";
import Gallery from "../Gallery";
import style from "./style.module.css";

export default function Container(props) {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    const { location } = props || {};
    const { latitude, longitude } = location || {};

    const hasCoordinates = !!latitude && !!longitude;

    hasCoordinates &&
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      )
        .then(resp => resp.json())
        .then(data => {
          setWeather(data.weather[0].description);
          setCity(data.name);
        });
  }); // TODO: why doesn't this require a dependency array?

  return (
    <div className={style.container}>
      <Weather weather={weather} city={city} />
      <Gallery weather={weather} />
    </div>
  );
}
