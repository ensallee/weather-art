import React from "react";
import style from "./style.module.css";

export default function Weather(props) {
  const { weather, city } = props || {};

  return (
    <div className={style.weatherContainer}>
      <h1>{city}</h1>
      <h3>{weather}</h3>
    </div>
  );
}
