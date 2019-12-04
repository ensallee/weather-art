import React, { useEffect, useState } from "react";
import style from "./style.module.css";

export default function Gallery(props) {
  const [image, setImage] = useState();
  const { primaryimageurl: imageUrl } = image || {};

  useEffect(props => {
    const { weather } = props || {};

    fetch(
      `https://api.harvardartmuseums.org/object?q=keyword=${weather}&size=20&apikey=${API_KEY}`
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

  //   useEffect(() => {
  //     const { weather } = props || {};
  //     console.log("weather", weather);

  //     weather &&
  //       fetch(
  //         `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${weather}` //this is no good b/c the keywords aren't good enough in the api.
  //       )
  //         .then(resp => resp.json())
  //         .then(data => {
  //           const randomImage =
  //             data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

  //           return fetch(
  //             `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomImage}`
  //           )
  //             .then(resp => resp.json())
  //             .then(data => setImage(data));
  //         });

  //     //   .then(data => console.log("data", data));
  //   });

  return (
    <div className={style.imageContainer}>
      <img src={imageUrl}></img>
    </div>
  );
}
