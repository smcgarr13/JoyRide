// Fetch Location Object from Geolocation API  
// Start changing the urls to make them dynamic with stored variables.
// API key variations + Coordinate Variables

let EndLatitude;
let EndLongitude;
let EndAddress;
let StartAddress;
let StartLatitude = localStorage.getItem("StartLatitude"); 
let StartLongitude = localStorage.getItem("StartLongitude");
const myAPIKey = "ed917d605c814a68adc8a1a68d0a3c97";
const ipGeoAPI_url = "https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey; 
// const StrtGeoCodingAPI_url = "https://api.geoapify.com/v1/geocode/search?text="+StartAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
var createRouteBtn = document.getElementById("route-btn");

// Note
// var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey; 


// Function to fetch api information then locally store that information under latitude and longitude.
async function  IpGetLoc(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const { location} = data;
    const {latitude,longitude} = location;
    const StartLocation = { latitude, longitude};
    localStorage.setItem("StartLocation",JSON.stringify(StartLocation));
    localStorage.setItem("StartLatitude",latitude);
    localStorage.setItem("StartLongitude",longitude);
}
// Reverse GEO API function
// Know address through GPS Coordinates
async function StrtAdrgetLoc(url){
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const StrtAddress1 = data.features[0].properties.address_line1;
    console.log(StrtAddress1);
    const StrtAddress2 = data.features[0].properties.address_line2;
    let StrtAddress = StrtAddress1 +" "+StrtAddress2;
    console.log(StrtAddress);
    localStorage.setItem("StartAddress",StrtAddress);
}
// Address location Function
async function geoCodingAPI(url){
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  const startCity = data.features[0].properties.city;
  const latitude = data.features[0].properties.lat;
  const longitude = data.features[0].properties.lon;
  localStorage.setItem("StartLongitude",longitude);
  localStorage.setItem("StartLatitude",latitude);
  localStorage.setItem("startCity",startCity);
}
// End Address
async function EndGeoCodingAPI(url){
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  var EndCity = data.features[0].properties.city;
  const latitude = data.features[0].properties.lat;
  const longitude = data.features[0].properties.lon;
  var EndLocation = {latitude,longitude};
  localStorage.setItem("EndLocation",JSON.stringify(EndLocation))
  localStorage.setItem("EndLongitude",longitude);
  localStorage.setItem("EndLatitude",latitude);
  localStorage.setItem("endCity",EndCity);
}


// Function Implementation
createRouteBtn.addEventListener('click',function(){
  // Press Button to get the value of the inputs
  let StartAddress = document.getElementById("start-address").value;
  localStorage.setItem('StartAddress',StartAddress);
  console.log(StartAddress);
  let EndAddress = document.getElementById("end-address").value;
  localStorage.setItem('EndAddress',EndAddress);
  console.log(EndAddress);
  StartLocation = JSON.parse(localStorage.getItem("StartLocation"));
  EndLocation = JSON.parse(localStorage.getItem("EndLocation"));
if(StartAddress === null || StartAddress === undefined){
  // If input is not defined then use IP location API call to get starting latitude and longitude to use Address API call.  
  IpGetLoc(ipGeoAPI_url);
  StartLatitude = localStorage.getItem("StartLatitude");
  StartLongitude = localStorage.getItem("StartLongitude");
  var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey; 
  StrtAdrgetLoc(StrtRvrsGeoApi);
}
else{ 
  // StartAddress = localStorage.getItem("StartAddress");
  // Url to call for latitude and longitude API call. 
  const StrtGeoCodingAPI_url = "https://api.geoapify.com/v1/geocode/search?text="+StartAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
  // Clean up address for API call
  StartAddress = StartAddress.replaceAll(',','');
  StartAddress = StartAddress.replaceAll('.','');
  StartAddress = StartAddress.split(" ");

  let StrtAddressArr = [];
  StrtAddressArr.push(StartAddress[0]);
  for(let i = 1;i<StartAddress.length;i++){
    StrtAddressArr.push("%20"+StartAddress[i]);
  }
  StrAdrStrng = StrtAddressArr.join("");

  // console.log(StrAdrStrng);
  // Run street address API call then store parameters inside local storage. 
  geoCodingAPI(StrtGeoCodingAPI_url);
}

if(localStorage.getItem("EndAddress")=== null || localStorage.getItem(StartAddress)=== undefined){

  // Have to add modal to alert user that should be recognized when input is faultyy
  var modal = document.getElementById("EndRouteModal");
  var span = document.getElementById('close')[0];
  modal.style.display = "block";
  span.onclick = function(){
    modal.style.display = 'none';
  }
  window.onclick = function(event){
    if(event.target == modal){
    modal.style.display = 'none';
    }}

}
else{
  // Fix End Address for API call.
  const EndGeoCodingAPI_url = "https://api.geoapify.com/v1/geocode/search?text="+ EndAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97"; 
  EndAddress = EndAddress.replaceAll(',','');
  EndAddress = EndAddress.replaceAll('.','');
  EndAddress = EndAddress.split(" ");
  let EndAddressArr = [];
  EndAddressArr.push(EndAddress[0]);
  for(let i = 1;i<EndAddress.length;i++){
    EndAddressArr.push("%20"+EndAddress[i]);
  
  }
  EndAdrStrng = EndAddressArr.join("");
  // API call to store destination variables. 
  EndGeoCodingAPI(EndGeoCodingAPI_url);
  // Variables are stored maybe kill next. 
  let EndLatitude = localStorage.getItem("EndLatitude");
  let EndLongitude = localStorage.getItem("EndLongitude");
  var EndRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+EndLatitude+"&lon="+EndLongitude+"&apiKey="+myAPIKey;
}

if(StartLocation === null && EndLocation === null){

}else{
  // Variables for Direction Function
  var directionsList = document.getElementById("route-directions");
  StartLatitude = localStorage.getItem("StartLatitude");
  StartLongitude = localStorage.getItem("StartLongitude");
  EndLatitude = localStorage.getItem("EndLatitude");
  EndLongitude = localStorage.getItem("EndLongitude");
  var customRoutingUrl = "https://api.geoapify.com/v1/routing?waypoints=" + StartLatitude + "%2C" + StartLongitude + "%7C" + EndLatitude + "%2C" + EndLongitude + "&detaisl=instruction_details&mode=drive&apiKey=" + myAPIKey;

  // Direction Function
  async function routtingAPI(url){
    const response = await fetch(url);
    const data = await response.json();
   console.log(data);
    var waypoints = data.features[0].properties.waypoints;
    localStorage.setItem("RouteWaypoints",JSON.stringify(waypoints))
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
    console.log(routeInst);
    localStorage.setItem("routeArr",JSON.stringify(routeArr));
    localStorage.setItem("routeInst",JSON.stringify(routeInst));
}
// Running Function to get variables 
  routtingAPI(customRoutingUrl); 
  var routeInst = JSON.parse(localStorage.getItem("routeInst"));
  console.log(routeInst);
  for(let l =0;l<routeInst.length;l++){
    var liDir = document.createElement('li');
    liDir.textContent = [l+1]+"."+routeInst[l].text
    directionsList.append(liDir); 
  }


}
});
