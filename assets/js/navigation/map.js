// Function for creating MAP
// this function must run after the geolocation script
// Get variables
StartLatitude = localStorage.getItem("StartLatitude");
StartLongitude = localStorage.getItem("StartLongitude");
EndLatitude = localStorage.getItem("EndLatitude");
EndLongitude = localStorage.getItem("EndLongitude");
const myAPIKey = "ed917d605c814a68adc8a1a68d0a3c97";
// Create interactive map variable

const map = new maplibregl.Map({
    container: 'my-map',
    zoom:6,
    center:[StartLongitude,StartLatitude],
    style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?center=lonlat:-1,47&zoom=5&apiKey=`+myAPIKey,
  });
  map.addControl(new maplibregl.NavigationControl());
  
//  Marker Icon https://api.geoapify.com/v1/icon?type=awesome&color=%2352b74c&size=x-large&icon=tree&noWhiteCircle=true&scaleFactor=2&apiKey=ed917d605c814a68adc8a1a68d0a3c97
//  Routing
// To do: write up function to alter url to fit in waypoints
var routingUrl = "https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&detaisl=instruction_details&mode=drive&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
async function routtingAPI(url){
    const response = await fetch(url);
    const data = await response.json();
   
    var waypoints =data.features[0].properties.waypoints;
    localStorage.setItem("RouteWaypoints",JSON.stringify(waypoints))
    console.log(waypoints);
    var coordinates = [];
    for(let i=0;i<waypoints.length;i++){
        coordinates.push(waypoints[i].location) 
    }
    localStorage.setItem("RouteCoordinates",JSON.stringify(coordinates))


    var routeArr = data.features[0].properties.legs[0].steps
    var routeInst = [];    
    for(let k=0;k<routeArr.length;k++){
       routeInst.push(routeArr[k].instruction) 
    }
    localStorage.setItem("routeArr",JSON.stringify(routeArr));
    localStorage.setItem("routeInst",JSON.stringify(routeInst));
}
// Map Matching

    var RouteCoordinates = JSON.parse(localStorage.getItem("RouteCoordinates"));
    var routeWaypoints = JSON.parse(localStorage.getItem("RouteWaypoints"));
    console.log(routeWaypoints);
    // let RouteString = [];
    // RouteString.push(RouteCoordinates[0][0]+"%2C"+RouteCoordinates[0][1]);
    // console.log(RouteString);
    // for(let j = 0;j<RouteCoordinates.length;j++){
    //     RouteString.push()  
    // }
    var MapProject = "EPSG:3857";
    var mapMatchingUrl = `https://api.geoapify.com/v1/mapmatching?key=${myAPIKey}&coordinates=${RouteCoordinates}&projection=${MapProject}`

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"mode":"drive","waypoints":routeWaypoints});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw
};

fetch("https://api.geoapify.com/v1/mapmatching?apiKey=ed917d605c814a68adc8a1a68d0a3c97", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
async function MapMatching(url){
    const response = await fetch(url);
    const data = await response.json;
    console.log(data);
}
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw
// };

// fetch("https://api.geoapify.com/v1/mapmatching?apiKey=ed917d605c814a68adc8a1a68d0a3c97", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// var requestOptions = {
//     method: 'GET',
//   };
  
//   fetch("https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=drive&apiKey=ed917d605c814a68adc8a1a68d0a3c97", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


routtingAPI(routingUrl);
MapMatching(mapMatchingUrl);
