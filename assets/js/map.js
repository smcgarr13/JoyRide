// Fetch Location Object from Geolocation API  
var requestOptions = {
  method: 'GET',
};

// API +key variable
const ipGeoAPI_url = "https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97";

// Function to fetch api information then locally store that information under latitude and longitude. 
async function  IpGetLoc(){
    const response = await fetch(ipGeoAPI_url);
    const data = await response.json();
    console.log(data);
    const { location} = data;
    console.log(location);
    const {latitude,longitude} = location;
    const StartLocation = { latitude, longitude};
    localStorage.setItem("StartLocation",JSON.stringify(StartLocation));
    localStorage.setItem("StartLatitude",latitude);
    localStorage.setItem("StartLongitude",longitude);
    const {address} = data;
    localStorage.setItem("address",address);

}

if(typeof (localStorage.getItem("StartLocation")) === null){

}else{
IpGetLoc();
}
// IpGetLoc();
// Need to write up function if user would want to submit address instead of API

const GeoCodAPI = "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=ed917d605c814a68adc8a1a68d0a3c97";

async function AdrgetLoc(){
    localStorage.getItem("address");

}



// var requestOptions = {
//     method: 'GET',
//   };
  
//   fetch("https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=ed917d605c814a68adc8a1a68d0a3c97", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// Need to 


// var requestOptions = {
//     method: 'GET',
//   };
  
//   fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));