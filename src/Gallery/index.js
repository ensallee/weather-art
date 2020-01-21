import React, { useEffect, useState } from "react";
import refreshIcon from "./media/refresh_icon.svg";
import style from "./style.module.css";

const defaultTerms = {
  clear: "sun",
  flurries: "snow",
  drizzle: "rain",
  "clear sky": "sun",
  "light snow": "snow"
};

export default function Gallery(props) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const {
    primaryImageSmall: imageUrl,
    title,
    medium,
    creditLine: credit,
    objectDate: date
  } = image || {};
  const { weather } = props || {};

  useEffect(() => {
    fetchArtwork();
  }, [weather]);

  useEffect(() => {
    image && setLoading(false);
  }, [image]);

  const fetchArtwork = () => {
    setImage(null);
    setLoading(true);
    const searchTerm = getSearchTerm(weather);

    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&medium=Paintings`
    )
      .then(resp => resp.json())
      .then(data => handleImageSelection(data.objectIDs));
  };

  const handleImageSelection = imageIds => {
    const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)];

    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomImageId}`
    )
      .then(resp => resp.json())
      .then(data => {
        setImage(data);
      });
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

  return (
    <div className={style.galleryContainer}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.innerContainer}>
          <div className={style.imageContainer}>
            <img src={imageUrl} alt={title} />
          </div>
          <div className={style.details}>
            <div className={style.textContainer}>
              <p>
                {title}, {date}
              </p>
              <p>{medium}</p>
              <p>{credit}</p>
            </div>
            <div className={style.refreshIconContainer} onClick={fetchArtwork}>
              <img src={refreshIcon} alt="refresh" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
