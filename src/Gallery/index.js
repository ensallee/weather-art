import React, { useEffect, useState } from "react";
import API_KEYS from "../.env.js";
import refreshIcon from "./media/refresh_icon.svg";
import style from "./style.module.css";

const defaultTerms = {
  clear: "sun",
  flurries: "snow",
  drizzle: "rain"
};

export default function Gallery(props) {
  const [image, setImage] = useState();
  const {
    primaryimageurl: imageUrl,
    creditline,
    culture,
    copyright,
    dated,
    technique,
    title
  } = image || {};
  const { weather } = props || {};

  useEffect(() => {
    fetchArtwork();
  }, [weather]);

  const fetchArtwork = () => {
    const searchTerm = getSearchTerm(weather);

    fetch(
      `https://api.harvardartmuseums.org/object?q=keyword=${searchTerm}&size=20&apikey=${API_KEYS.harvardMuseums}`
    )
      .then(resp => resp.json())
      .then(data => handleImageData(data.records));
  };

  //Not all weather summaries return acceptable art results. This method coerces certain summaries into useful search terms.
  const getSearchTerm = summary => {
    const summaryArray = summary.split(" ").map(word => word.toLowerCase());

    const hardCodedTerm = Object.keys(defaultTerms)
      .filter(term => {
        const filteredSummaryArray = summaryArray.filter(word => {
          if (word === term) return term;
        });

        if (filteredSummaryArray.includes(term)) return term;
      })
      .map(filteredTerm => defaultTerms[filteredTerm]);

    if (hardCodedTerm.length !== 0) return hardCodedTerm;

    return summary;
  };

  const handleImageData = records => {
    const filteredRecords = records.filter(record => record.primaryimageurl);

    const randomImage =
      filteredRecords[Math.floor(Math.random() * filteredRecords.length)];

    setImage(randomImage);
  };

  return (
    <div className={style.galleryContainer}>
      <div className={style.imageContainer}>
        <img src={imageUrl} alt={title} />
        <div className={style.details}>
          <div className={style.textContainer}>
            <p>
              {title}, {dated}
            </p>
            <p>{technique}</p>
            <p>{culture}</p>
            <p>{creditline}</p>
          </div>
          <div className={style.refreshIconContainer} onClick={fetchArtwork}>
            <img src={refreshIcon} alt="refresh" />
          </div>
        </div>
      </div>
      <p className={style.copyright}>{copyright}</p>
    </div>
  );
}
