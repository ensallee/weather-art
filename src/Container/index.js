import React, { Fragment, useEffect, useState } from "react";
import Weather from "../Weather";
import Gallery from "../Gallery";
import MapModal from "../MapModal";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function Container(props) {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const { location, setLocation } = props || {};

  useEffect(() => {
    getWeather();
  }, [location]);

  const getWeather = () => {
    const { latitude, longitude } = location || {};
    const hasCoordinates = !!latitude && !!longitude;

    hasCoordinates &&
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS.openWeather}`
      )
        .then(resp => resp.json())
        .then(data => {
          setWeather(data.weather[0].description);
          setCity(data.name);
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
            <Weather weather={weather} city={city} toggleModal={toggleModal} />
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
