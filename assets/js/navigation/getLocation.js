// Fetch Location Object from Geolocation API  
// Start changing the urls to make them dynamic with stored variables.
// API +key variable
const myAPIKey = "ed917d605c814a68adc8a1a68d0a3c97"
const ipGeoAPI_url = "https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
const GeoCodingAPI = "https://api.geoapify.com/v1/geocode/search?text="+ StartAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";

if(localStorage.getItem("StartLatitude") === null){
  IpGetLoc();
}else{  
  let StartLatitude = localStorage.getItem("StartLatitude");
  let StartLongitude = localStorage.getItem("StartLongitude");
  var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey;
}


if(localStorage.getItem("EndLatitude")=== null){
}
let EndLatitude = localStorage.getItem("EndLatitude");
let EndLongitude = localStorage.getItem("EndLongitude");
var EndRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+EndLatitude+"&lon="+EndLongitude+"&apiKey="+myAPIKey;
// const EndRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
// const GeoCodingAPI = "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
// Test Address
// let StartAddress = "38 Upper Montagu Street, London W1H 1LJ, United Kingdom";
let StartAddress = localStorage.getItem("StartAddress");
StartAddress = StartAddress.replaceAll(',','');
StartAddress = StartAddress.replaceAll('.','');
StartAddress = StartAddress.split(" ");
let StrtAddressArr = [];
StrtAddressArr.push(StartAddress[0]);
for(let i = 1;i<StartAddress.length;i++){
    StrtAddressArr.push("%20"+StartAddress[i]);
  
}
StrAdrStrng = StrtAddressArr.join("");

// Function to fetch api information then locally store that information under latitude and longitude.

// Ip location Function
// const ipGeoAPI_url = "https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
async function  IpGetLoc(url){
    const response = await fetch(url);
    const data = await response.json();
    const { location} = data;
    const {latitude,longitude} = location;
    const StartLocation = { latitude, longitude};
    localStorage.setItem("StartLocation",JSON.stringify(StartLocation));
    localStorage.setItem("StartLatitude",latitude);
    localStorage.setItem("StartLongitude",longitude);
    const {address} = data;
    localStorage.setItem("address",address);

}
// Reverse GEO API function
//   let StartLatitude = localStorage.getItem("StartLatitude");
// let StartLongitude = localStorage.getItem("StartLongitude");
// var StrtRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat="+StartLatitude+"&lon="+StartLongitude+"&apiKey="+myAPIKey;
async function StrtAdrgetLoc(url){
    const response = await fetch(url);
    const data = await response.json();
    const latitude = data.features[0].properties.lat;
    const longitude = data.features[0].properties.lon;
    localStorage.setItem("StartLongitude",longitude);
    localStorage.setItem("StartLatitude",latitude);
}
// const EndRvrsGeoApi = "https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
async function EndAdrgetLoc(url){
  localStorage.getItem("EndAddress");
  const response = await fetch(url);
  const data = await response.json();
  const latitude = data.features[0].properties.lat;
  const longitude = data.features[0].properties.lon;
  localStorage.setItem("EndLongitude",longitude);
  localStorage.setItem("EndLatitude",latitude);

}
// Address location Function
// const GeoCodingAPI = "https://api.geoapify.com/v1/geocode/search?text="+ StartAddress+"&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
async function geoCodingAPI(url){
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const latitude = data.features[0].properties.lat;
  const longitude = data.features[0].properties.lon;
  localStorage.setItem("StartAddressLongitude",longitude);
  localStorage.setItem("StartAddressLatitude",latitude);
}


// Generate Map Function
const map = new maplibregl.Map({
  container: 'my-map',
  style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?center=lonlat:-1,47&zoom=1&apiKey=`+myAPIKey,
});
map.addControl(new maplibregl.NavigationControl());

// Create Routing function. 

// Function Implementation