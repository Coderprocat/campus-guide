// ===============================
// CREATE MAP
// ===============================

var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

// ===============================
// IMAGE SETTINGS
// ===============================

const imageWidth = 1200;
const imageHeight = 1600;

const bounds = [[0, 0], [imageHeight, imageWidth]];

// ===============================
// CAMPUS IMAGE
// ===============================

L.imageOverlay('campus.png', bounds).addTo(map);

map.fitBounds(bounds);

// ===============================
// CAMPUS LOCATIONS
// ===============================

const locations = {

  "library": [140, 320],

  "canteen": [1500, 850],

  "washroom": [1180, 350],

  "seminar hall": [180, 600],

  "pharma lab": [1000, 650],

  "machine room": [1020, 820]

};

// ===============================
// ADD LOCATION MARKERS
// ===============================

Object.keys(locations).forEach(place => {

  L.marker(locations[place])
    .addTo(map)
    .bindPopup(place.toUpperCase());

});

// ===============================
// USER LOCATION MARKER
// ===============================

let userMarker;
let routeLine;

// Starting location
// Example: user at canteen

let currentLocation = [1500, 850];

// ===============================
// CREATE USER MARKER
// ===============================

userMarker = L.marker(currentLocation)
  .addTo(map)
  .bindPopup("📍 You Are Here")
  .openPopup();

// ===============================
// LIVE LOCATION TRACKING
// ===============================

// Simulates walking movement

function updateLiveLocation(newCoords){

  currentLocation = newCoords;

  userMarker.setLatLng(newCoords);

}

// ===============================
// FIND ROUTE FUNCTION
// ===============================

function findRoute(){

  const input =
  document
  .getElementById("destinationInput")
  .value
  .toLowerCase()
  .trim();

  if(!locations[input]){

    alert("Destination not found!");

    return;

  }

  const destination = locations[input];

  // Remove old route

  if(routeLine){

    map.removeLayer(routeLine);

  }

  // CREATE GOOGLE-MAPS STYLE ROUTE

  routeLine = L.polyline(

    [
      currentLocation,

      // hallway turns
      [1200, 850],

      [1200, 500],

      destination
    ],

    {
      color: '#00FFFF',
      weight: 8,
      smoothFactor: 1
    }

  ).addTo(map);

  // Zoom to route

  map.fitBounds(routeLine.getBounds());

}

// ===============================
// SIMULATED LIVE WALKING
// ===============================

// Demo walking animation

let step = 0;

const walkingPath = [

  [1500, 850],
  [1450, 850],
  [1400, 850],
  [1350, 850],
  [1300, 850],
  [1250, 850],
  [1200, 850],
  [1200, 780],
  [1200, 700],
  [1200, 620],
  [1200, 540],
  [1200, 500]

];

// Move every second

setInterval(() => {

  if(step < walkingPath.length){

    updateLiveLocation(walkingPath[step]);

    step++;

  }

}, 1000);