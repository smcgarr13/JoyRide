//add weather API root and key variables
var weatherApiKey = "b93cfee2cf6c4ff52b56ed5c856c3976";
var weatherApiRoot = 'https://api.openweathermap.org';

var givenApiKey = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=b93cfee2cf6c4ff52b56ed5c856c3976'
var longitude = "33.7488";
var latitude = '-84.3877';

var inputLonLat = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherApiKey + '&units=imperial'
var forecastDiv = document.querySelector("#forecast")

function getWeatherCondition(weatherCondition) {
    if (weatherCondition == "Thunderstorm") {
        return 'Weather is not good for a drive'
    }
    else if (weatherCondition == "Drizzle") {
        return 'Weather is not good for a drive going to need the rain gear'
    }
    else if (weatherCondition == "Rain") {
        return 'Weather is not good for a drive going to need the rain gear'
    }
    else if (weatherCondition == "Snow") {
        return 'Weather is not good for a drive going to be cold Cold'
    }
    else if (weatherCondition == "Atmosphere") {
        return 'Weather is not good for a drive low vis'
    }
    else if (weatherCondition == "Clear") {
        return 'Weather is good for a drive'
    }
    else if (weatherCondition == "Clouds") {
        return 'Weather is good for a drive'
    }
    else { 
        return "There's an error with weather"
    }
}


async function getWeatherData() {
    const response = await fetch(inputLonLat);
    const data = await response.json();

    forecastDiv.textContent = ""
    //var timeLeave = time.value
    //create for loops for all variables to have just needed data for next 5 days 

    for (var i = 0; i < data.list.length; i += 8) {
        //everytime the loop is iterated a new empty div is created
        var divCard = document.createElement('div')
        divCard.className = "card"

        //html card content
        weatherCard = `
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">CITY NAME</p>
                  <p class="subtitle is-6">${data.list[i].weather[0].description}</p>
                </div>
              </div>
          
              <div class="content">
                ${getWeatherCondition(data.list[i].weather[0].main)}
                <br>
                <p> Temp: ${data.list[i].main.temp}</p>
                <p> Wind Speed: ${data.list[i].wind.speed} </p>
                <p> Humidity: </p>
                <time datetime="2016-1-1">${data.list[i].dt_txt}</time>
              </div>
            </div>
        `

        //write the html content to the div card that was created
        divCard.innerHTML = weatherCard

        //append the div card to the forecast div
        forecastDiv.appendChild(divCard)

    }


    //set all variable for local storage 


    console.log(data)
    
}


getWeatherData()