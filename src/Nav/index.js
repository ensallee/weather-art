import React from "react";
import style from "./style.module.css";

export default function Nav(props) {
  const { weather, locationString, toggleModal } = props;

  return (
    <div className={style.navContainer}>
      <div className={style.innerContainer}>
        <h3>WeatherVane</h3>
        <div className={style.detailsContainer}>
          <p>{locationString}</p>
          <p>{weather}</p>
        </div>
        <button className={style.hideOnDesktop} onClick={toggleModal}>
          Change Location
        </button>
      </div>
    </div>
  );
}
