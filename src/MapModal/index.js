import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { reverseGeocode } from "../utils.js";
import API_KEYS from "../.env.js";
import closeIcon from "./media/close_icon.svg";
import style from "./style.module.css";

export default function MapModal(props) {
  const mapContainer = useRef(null);
  const [mapLocation, setMapLocation] = useState();
  const [mapLocationString, setMapLocationString] = useState();
  const [mapWeather, setMapWeather] = useState();
  const {
    location,
    setLocation,
    toggleModal,
    getWeather,
    weather: initialWeather
  } = props;
  const { longitude: initialLongitude, latitude: initialLatitude } =
    location || {};
  const { currentSummary, minuteSummary } = mapWeather || {};

  useEffect(() => {
    setMapWeather(initialWeather);
    reverseGeocode(
      {
        longitude: initialLongitude,
        latitude: initialLatitude
      },
      setMapLocationString
    );
    setupMap();
  }, []);

  const handleLocationChange = location => {
    getWeather(location, setMapWeather);
    setMapLocation(location);
    reverseGeocode(
      {
        longitude: location.longitude,
        latitude: location.latitude
      },
      setMapLocationString
    );
  };

  const setupMap = () => {
    mapboxgl.accessToken = API_KEYS.mapBox;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialLongitude, initialLatitude],
      zoom: 3
    });
    map.on("click", e => {
      handleLocationChange({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      });
    });
  };

  const getArtwork = () => {
    setLocation(mapLocation);
    toggleModal();
  };

  return (
    <div className={style.modalContainer} onClick={toggleModal}>
      <div className={style.innerContainer} onClick={e => e.stopPropagation()}>
        <div
          ref={mapContainer}
          className={style.mapContainer}
          onClick={e => e.stopPropagation()} //TODO: is this slowing the map down?
        />
        <div className={style.textContainer}>
          <h5>{mapLocationString}</h5>
          <p>{minuteSummary || currentSummary}</p>
          <div className={style.buttonContainer}>
            <button onClick={getArtwork}>Get Artwork</button>
            <button onClick={toggleModal}>Cancel</button>
          </div>
          <div className={style.closeIconContainer} onClick={toggleModal}>
            <img src={closeIcon} alt="close" />
          </div>
        </div>
      </div>
    </div>
  );
}
