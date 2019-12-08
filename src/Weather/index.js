import React, { useEffect, useState } from "react";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function Weather(props) {
  const [locationString, setLocationString] = useState();
  const { weather, toggleModal } = props || {};
  const { currentSummary, minuteSummary } = weather || {};

  useEffect(() => {
    const { location } = props;
    const { longitude, latitude } = location || {};
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${API_KEYS.mapBox}`
    )
      .then(resp => resp.json())
      .then(data => {
        findMostPreciseLocation(data.features);
      });
  }, [weather]);

  const findMostPreciseLocation = features => {
    const trimmedFeatures = features.slice(0, 3).reverse();
    const locationString = trimmedFeatures.find(feature => feature.place_name)
      .place_name;
    setLocationString(locationString);
  };

  return (
    <div className={style.weatherContainer}>
      <div className={style.weatherText}>
        <h2>{locationString}</h2>
        <h4>
          <i>{minuteSummary ? minuteSummary : currentSummary}</i>
        </h4>
        <button onClick={toggleModal} className={style.button}>
          Change Location
        </button>
      </div>
    </div>
  );
}
