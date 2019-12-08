import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import API_KEYS from "../.env.js";
import closeIcon from "./media/close_icon.svg";
import style from "./style.module.css";

export default function MapModal(props) {
  const mapContainer = useRef(null);
  const [initialLocation, setInitialLocation] = useState();
  const [mapLocation, setMapLocation] = useState(initialLocation);
  const {
    location,
    setLocation,
    toggleModal,
    locationString,
    reverseGeocode,
    getWeather,
    weather
  } = props;
  const { longitude, latitude } = location || {};
  const { currentSummary, minuteSummary } = weather || {};

  useEffect(() => {
    setInitialLocation(props.location);
    setMapLocation(props.location);
    setupMap();
  }, []);

  useEffect(() => {
    reverseGeocode(mapLocation);
    getWeather(mapLocation);
  }, [mapLocation]);

  const setupMap = () => {
    mapboxgl.accessToken = API_KEYS.mapBox;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 3
    });
    map.on("click", e => {
      setMapLocation({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      });
    });
  };

  const resetLocation = e => {
    e.stopPropagation();
    setLocation(initialLocation);
    getWeather(initialLocation);
    toggleModal();
  };

  return (
    <div className={style.modalContainer} onClick={toggleModal}>
      <div className={style.innerContainer}>
        <div
          ref={mapContainer}
          className={style.mapContainer}
          onClick={e => e.stopPropagation()} //TODO: is this slowing the map down?
        />
        <div className={style.textContainer}>
          <h5>{locationString}</h5>
          <p>{minuteSummary || currentSummary}</p>
          <div className={style.buttonContainer}>
            <button onClick={toggleModal}>Get Artwork</button>
            <button onClick={e => resetLocation(e)}>Cancel</button>
          </div>
          <div className={style.closeIconContainer}>
            <img src={closeIcon} alt="close" />
          </div>
        </div>
      </div>
    </div>
  );
}
