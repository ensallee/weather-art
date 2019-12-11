import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import API_KEYS from "../.env.js";
import closeIcon from "./media/close_icon.svg";
import style from "./style.module.css";

let map = undefined;

export default function MapModal(props) {
  const mapContainer = useRef(null);
  const [mapLocation, setMapLocation] = useState();
  const [mapLocationString, setMapLocationString] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [mapWeather, setMapWeather] = useState();

  const {
    location,
    setLocation,
    toggleModal,
    getWeather,
    reverseGeocode,
    weather: initialWeather
  } = props;
  const { longitude: initialLongitude, latitude: initialLatitude } =
    location || {};

  useEffect(() => {
    const listenForEnter = e => e.keyCode === 13 && handleSubmit();

    document.addEventListener("keydown", listenForEnter);

    return () => document.removeEventListener("keydown", listenForEnter);
  });

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

  const setupMap = () => {
    mapboxgl.accessToken = API_KEYS.mapBox;
    map = new mapboxgl.Map({
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

  const handleLocationChange = location => {
    setIsSearching(false);
    getWeather(location, setMapWeather);
    setMapLocation(location);
    map.setCenter([location.longitude, location.latitude]);
    reverseGeocode(
      {
        longitude: location.longitude,
        latitude: location.latitude
      },
      setMapLocationString
    );
  };

  const getArtwork = () => {
    setLocation(mapLocation);
    toggleModal();
  };

  const handleInputChange = e => {
    setIsSearching(true); //TODO: is there a better way to do this?
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${API_KEYS.mapBox}`
    )
      .then(resp => resp.json())
      .then(data => {
        const coordinates =
          data && data.features && data.features[0] && data.features[0].center;
        handleLocationChange({
          longitude: coordinates[0],
          latitude: coordinates[1]
        });
      });
  };

  return (
    <div className={style.modalContainer} onClick={toggleModal}>
      <div className={style.innerContainer} onClick={e => e.stopPropagation()}>
        <div ref={mapContainer} className={style.mapContainer} />
        <div className={style.textContainer}>
          <div className={style.inputContainer}>
            <input
              type="text"
              value={isSearching ? searchTerm : mapLocationString}
              onChange={e => handleInputChange(e)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <p>{mapWeather}</p>
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
