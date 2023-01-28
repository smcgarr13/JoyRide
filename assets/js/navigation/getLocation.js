// Fetch Location Object from Geolocation API  
// Start changing the urls to make them dynamic with stored variables.
// API key variations + Coordinate Variables

let EndLatitude;
let EndLongitude;
let StartAddress = document.getElementById("start-address").value;
let EndAddress = document.getElementById("end-address").value;
let StartLatitude = localStorage.getItem("StartLatitude"); 
let StartLongitude = localStorage.getItem("StartLongitude");
const myAPIKey = "ed917d605c814a68adc8a1a68d0a3c97";
const ipGeoAPI_url = "https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey; 
// const StrtGeoCodingAPI_url = "https://api.geoapify.com/v1/geocode/search?text="+StartAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
const EndGeoCodingAPI_url = "https://api.geoapify.com/v1/geocode/search?text="+ EndAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";

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
// async function EndAdrgetLoc(url){
//   localStorage.getItem("EndAddress");
//   const response = await fetch(url);
//   const data = await response.json();
//   const latitude = data.features[0].properties.lat;
//   const longitude = data.features[0].properties.lon;
//   localStorage.setItem("EndLongitude",longitude);
//   localStorage.setItem("EndLatitude",latitude);
// }
// Address location Function
async function geoCodingAPI(url){
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
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
  console.log(data);
  var startCity = data.features[0].properties.city;
  const latitude = data.features[0].properties.lat;
  const longitude = data.features[0].properties.lon;
  localStorage.setItem("EndLongitude",longitude);
  localStorage.setItem("EndLatitude",latitude);
  localStorage.setItem("startingCity",startCity);
}


// Function Implementation
createRouteBtn.addEventListener('click',function(){
if(localStorage.getItem("StartAddress") === null){
  IpGetLoc(ipGeoAPI_url);
  StartLatitude = localStorage.getItem("StartLatitude");
  StartLongitude = localStorage.getItem("StartLongitude");
  var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey; 
  StrtAdrgetLoc(StrtRvrsGeoApi);
}else{ 
  StartAddress = localStorage.getItem("StartAddress");
  const StrtGeoCodingAPI_url = "https://api.geoapify.com/v1/geocode/search?text="+StartAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
  console.log(StartAddress)
  StartAddress = StartAddress.replaceAll(',','');
  StartAddress = StartAddress.replaceAll('.','');
  StartAddress = StartAddress.split(" ");

  let StrtAddressArr = [];
  StrtAddressArr.push(StartAddress[0]);
  for(let i = 1;i<StartAddress.length;i++){
    StrtAddressArr.push("%20"+StartAddress[i]);
  
  }

  StrAdrStrng = StrtAddressArr.join(""); 
  console.log(StrAdrStrng);
  geoCodingAPI(StrtGeoCodingAPI_url);
  let StartLatitude = localStorage.getItem("StartLatitude");
  let StartLongitude = localStorage.getItem("StartLongitude");
}

if(localStorage.getItem("EndAddress")=== null){
  // Have to add modal to alert user that  
}else{

  EndAddress = localStorage.getItem("EndAddress");
  EndAddress = EndAddress.replaceAll(',','');
  EndAddress = EndAddress.replaceAll('.','');
  EndAddress = EndAddress.split(" ");
  let EndAddressArr = [];
  EndAddressArr.push(EndAddress[0]);
  for(let i = 1;i<EndAddress.length;i++){
    EndAddressArr.push("%20"+EndAddress[i]);
  
  }
  EndAdrStrng = EndAddressArr.join(""); 
  EndGeoCodingAPI(EndGeoCodingAPI_url);
  let EndLatitude = localStorage.getItem("EndLatitude");
  let EndLongitude = localStorage.getItem("EndLongitude");
  var EndRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+EndLatitude+"&lon="+EndLongitude+"&apiKey="+myAPIKey;
}
});
