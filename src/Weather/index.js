import React, { useEffect, useState } from "react";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function Weather(props) {
  const { weather, toggleModal, locationString } = props || {};

  return (
    <div className={style.weatherContainer}>
      <div className={style.weatherText}>
        <h2>{locationString}</h2>
        <h4>
          <i>{weather}</i>
        </h4>
        <button onClick={toggleModal} className={style.button}>
          Change Location
        </button>
      </div>
    </div>
  );
}
