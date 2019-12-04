import React, { useEffect, useState } from "react"
import API_KEYS from "../.env.js"
import refreshIcon from "./media/refresh_icon.svg"
import style from "./style.module.css"

export default function Gallery(props) {
  const [image, setImage] = useState()
  const {
    primaryimageurl: imageUrl,
    creditline,
    culture,
    copyright,
    dated,
    technique,
    title
  } = image || {}
  const { weather } = props || {}

  useEffect(() => {
    fetchArtwork()
  }, [weather])

  const fetchArtwork = () => {
    fetch(
      `https://api.harvardartmuseums.org/object?q=keyword=${weather}&size=20&apikey=${API_KEYS.harvardMuseums}`
    )
      .then(resp => resp.json())
      .then(data => handleImageData(data.records))
  }

  const handleImageData = records => {
    const filteredRecords = records.filter(record => record.primaryimageurl)

    const randomImage =
      filteredRecords[Math.floor(Math.random() * filteredRecords.length)]

    setImage(randomImage)
  }

  return (
    <div className={style.imageContainer}>
      <img src={imageUrl} alt={title} />
      <div className={style.detailsOverlay}>
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
  )
}
