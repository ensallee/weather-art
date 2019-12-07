import React from "react";
import style from "./style.module.css";

export default function Weather(props) {
  const { weather, city, toggleModal } = props || {};

  return (
    <div className={style.weatherContainer}>
      <div className={style.weatherText}>
        <h2>{city}</h2>
        <h4>
          <i>{weather}</i>
        </h4>
      </div>
      <button onClick={toggleModal}>Change Location</button>
    </div>
  );
}
