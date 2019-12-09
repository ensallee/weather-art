import API_KEYS from "./.env.js";

export function reverseGeocode(location, callback) {
  const { longitude, latitude } = location || {};
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${API_KEYS.mapBox}`
  )
    .then(resp => resp.json())
    .then(data => {
      findMostPreciseLocation(data.features, callback);
    });
}

export function findMostPreciseLocation(features, callback) {
  //this needs to take a callback so it's not setting the head location string every time--either set the head location string or set teh location inside the modal. consider moving into utils
  const trimmedFeatures = features.slice(0, 3).reverse();
  const locationString = trimmedFeatures.find(feature => feature.place_name)
    .place_name;
  //   setLocationString(locationString);
  console.log("locationString inside util", locationString);
  callback(locationString);
}
