// Function for creating MAP
// this function must run after the geolocation script
// Get variables
StartLatitude = localStorage.getItem("StartLatitude");
StartLongitude = localStorage.getItem("StartLongitude");
EndLatitude = localStorage.getItem("EndLatitude");
EndLongitude = localStorage.getItem("EndLongitude");
const myAPIKey2 = "ed917d605c814a68adc8a1a68d0a3c97";
var createRouteBtn = document.getElementById("route-btn");
var directionsList = document.getElementById("route-directions");
// Create interactive map variable

// const map = new maplibregl.Map({
//     container: 'my-map',
//     zoom:6,
//     center:[StartLongitude,StartLatitude],
//     style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?center=lonlat:-1,47&zoom=5&apiKey=`+myAPIKey2,
//   });
//   map.addControl(new maplibregl.NavigationControl());

var routingUrl = "https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&detaisl=instruction_details&mode=drive&apiKey=ed917d605c814a68adc8a1a68d0a3c97";

var customRoutingUrl = "https://api.geoapify.com/v1/routing?waypoints="+StartLongitude+"%2C"+StartLatitude+"%7C"+EndLongitude+"%2C"+EndLatitude+"&detaisl=instruction_details&mode=drive&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
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
// Creating Route Inst Dynamic List
    var RouteCoordinates = JSON.parse(localStorage.getItem("RouteCoordinates"));
    var routeWaypoints = JSON.parse(localStorage.getItem("RouteWaypoints"));
    var routeInst = JSON.parse(localStorage.getItem("routeInst"));
    console.log(routeInst);

// Writing Button Functionality 
    createRouteBtn.addEventListener('click',function(){
     var mapOpacity = document.getElementsByClassName("api-display");
     mapOpacity.style.opacity = 0.2;
     routtingAPI(customRoutingUrl); 
      for(let i =0;i<routeInst.length;i++){
        var liDir = document.createElement('li');
        liDir.textContent = [i+1]+"."+routeInst[i].text
        directionsList.append(liDir); 
      }


    });

  routtingAPI(routingUrl);
