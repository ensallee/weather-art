import React, { Fragment, useEffect, useState } from "react";
import Weather from "../Weather";
import Gallery from "../Gallery";
import MapModal from "../MapModal";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function Container(props) {
  const [weather, setWeather] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const { location, setLocation } = props || {};

  useEffect(() => {
    getWeather();
  }, [location]);

  const getWeather = () => {
    const { latitude, longitude } = location || {};
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

  return (
    <div className={style.mainContainer}>
      <div className={style.innerContainer}>
        {weather ? (
          <Fragment>
            <Weather
              weather={weather}
              location={location}
              toggleModal={toggleModal}
            />
            <Gallery weather={weather} />
          </Fragment>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {modalOpen && (
        <MapModal
          location={location}
          setLocation={setLocation}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}
