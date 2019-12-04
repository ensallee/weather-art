import React, { useEffect, useState } from "react";
import API_KEYS from "../.env.js";
import style from "./style.module.css";

export default function Gallery(props) {
  const [image, setImage] = useState();
  const { primaryimageurl: imageUrl } = image || {};

  useEffect(props => {
    const { weather } = props || {};

    fetch(
      `https://api.harvardartmuseums.org/object?q=keyword=${weather}&size=20&apikey=${API_KEYS.harvardMuseums}`
    )
      .then(resp => resp.json())
      .then(data => handleImageData(data.records));
  }, []);

  const handleImageData = records => {
    const filteredRecords = records.filter(record => record.primaryimageurl);

    const randomImage =
      filteredRecords[Math.floor(Math.random() * records.length)];

    setImage(randomImage);
  };

  return (
    <div className={style.imageContainer}>
      <img src={imageUrl} />
    </div>
  );
}
