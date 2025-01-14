// console.log(mapToken);
const mapDiv = document.getElementById("map");
const listing = JSON.parse(mapDiv.getAttribute("data-listing"));
console.log(listing);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates,
  zoom: 11,
});

// console.log(coordinates);
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.location}</h4><p>Exact location provided after booking</p>`
    )
  )
  .addTo(map);
