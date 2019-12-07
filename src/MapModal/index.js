import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function MapModal(props) {
  const mapContainer = useRef(null);
  const { setLocation } = props;

  useEffect(() => {
    setupMap();
  });

  const setupMap = () => {
    mapboxgl.accessToken = API_KEYS.mapBox;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      //   center: [this.state.coords.lng, this.state.coords.lat],
      //   zoom: this.state.zoom,
      attributionControl: false
    });
    // const Geocoder = new MapboxGeocoder({
    //   accessToken: API_KEYS[mapBox],
    //   marker: false
    // });
  };

  return (
    <div className={style.modalContainer}>
      <div ref={mapContainer} className={style.mapContainer}></div>
    </div>
  );
}
