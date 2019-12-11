import React, { Fragment, useEffect, useState } from "react";
import Nav from "../Nav";
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
    getWeather(location, setWeather);
  }, [location]);

  useEffect(() => {
    reverseGeocode(location, setLocationString);
  }, [weather]);

  // these three methods accept callbacks so that state on Container and on MapModal can be managed independently of one another.
  const getWeather = (location, callback) => {
    const { longitude, latitude } = location || {};
    const hasCoordinates = !!latitude && !!longitude;

    hasCoordinates &&
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS.openWeather}`
      )
        .then(resp => resp.json())
        .then(data => {
          data &&
            data.weather &&
            data.weather[0] &&
            callback(data.weather[0].description);
        });
  };

  const reverseGeocode = (location, callback) => {
    const { longitude, latitude } = location || {};
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${API_KEYS.mapBox}`
    )
      .then(resp => resp.json())
      .then(data => {
        findMostPreciseLocation(data.features, callback);
      });
  };

  const findMostPreciseLocation = (features, callback) => {
    const trimmedFeatures = features.slice(0, 3).reverse();
    const locationString = trimmedFeatures.find(feature => feature.place_name)
      .place_name;
    callback(locationString);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Fragment>
      <Nav weather={weather} locationString={locationString} />
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
              <Gallery weather={weather} />
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
    </Fragment>
  );
}
