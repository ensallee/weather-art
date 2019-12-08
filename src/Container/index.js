import React, { Fragment, useEffect, useState } from "react";
import Weather from "../Weather";
import Gallery from "../Gallery";
import MapModal from "../MapModal";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function Container(props) {
  const [weather, setWeather] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [locationString, setLocationString] = useState();

  const { location, setLocation } = props || {};

  useEffect(() => {
    console.log("inside useEffect on container");
    !modalOpen && getWeather(location);
  }, [location]);

  useEffect(() => {
    !modalOpen && reverseGeocode(location);
  }, [weather]);

  const reverseGeocode = location => {
    const { longitude, latitude } = location || {};
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${API_KEYS.mapBox}`
    )
      .then(resp => resp.json())
      .then(data => {
        findMostPreciseLocation(data.features);
      });
  };

  const findMostPreciseLocation = features => {
    const trimmedFeatures = features.slice(0, 3).reverse();
    const locationString = trimmedFeatures.find(feature => feature.place_name)
      .place_name;
    setLocationString(locationString);
  };

  const getWeather = location => {
    const { longitude, latitude } = location || {};
    const hasCoordinates = !!latitude && !!longitude;

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://api.darksky.net/forecast/${API_KEYS.darkSky}/${latitude},${longitude}`;

    hasCoordinates &&
      fetch(proxyUrl + targetUrl)
        .then(resp => resp.json())
        .then(data => {
          setWeather({
            currentSummary: data.currently.summary,
            minuteSummary: data.minutely && data.minutely.summary,
            temperature: data.currently.apparentTemperature
          });
        });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  console.log("weather", weather);

  return (
    <div className={style.mainContainer}>
      <div className={style.innerContainer}>
        {weather ? (
          <Fragment>
            <Weather
              weather={weather}
              location={location}
              locationString={locationString}
              toggleModal={toggleModal}
            />
            <Gallery weather={weather} modalOpen={modalOpen} />
          </Fragment>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {modalOpen && (
        <MapModal
          weather={weather}
          location={location}
          locationString={locationString}
          setLocation={setLocation}
          toggleModal={toggleModal}
          getWeather={getWeather}
          reverseGeocode={reverseGeocode}
        />
      )}
    </div>
  );
}
