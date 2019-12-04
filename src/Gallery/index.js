import React, { useEffect, useState } from "react"
import API_KEYS from "../.env.js"
import style from "./style.module.css"

export default function Gallery(props) {
  const [image, setImage] = useState()
  const { primaryimageurl: imageUrl } = image || {}
  const { weather } = props || {}

  useEffect(() => {
    fetch(
      `https://api.harvardartmuseums.org/object?q=keyword=${weather}&size=20&apikey=${API_KEYS.harvardMuseums}`
    )
      .then(resp => resp.json())
      .then(data => handleImageData(data.records))
  }, [weather])

  const handleImageData = records => {
    const filteredRecords = records.filter(record => record.primaryimageurl)

    const randomImage =
      filteredRecords[Math.floor(Math.random() * filteredRecords.length)]

    setImage(randomImage)
  }

  return (
    <div className={style.imageContainer}>
      <img src={imageUrl} />
    </div>
  )
}
