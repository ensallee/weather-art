import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import API_KEYS from "../.env.js";
import closeIcon from "./media/close_icon.svg";
import style from "./style.module.css";

export default function MapModal(props) {
  const mapContainer = useRef(null);
  const { location, setLocation, toggleModal } = props;
  const { longitude, latitude } = location || {};

  useEffect(() => {
    setupMap();
  }, []);

  const setupMap = () => {
    mapboxgl.accessToken = API_KEYS.mapBox;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 1
    });
    map.on("click", e => {
      setLocation({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      });
    });
  };

  return (
    <div className={style.modalContainer} onClick={toggleModal}>
      <div ref={mapContainer} className={style.mapContainer}>
        <div className={style.closeIconContainer}>
          <img src={closeIcon} alt="close" />
        </div>
      </div>
    </div>
  );
}
