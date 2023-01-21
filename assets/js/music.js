var APIKey = "3be84550c5msh6225c2c3674dcaep112662jsn51bef5314860";

const settings = {
  async: true,
  crossDomain: true,
  url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=theroots",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3be84550c5msh6225c2c3674dcaep112662jsn51bef5314860",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

$(document).ready(function () {
  // add listner for click event
  var createButton = $("#create-button");
  createButton.on("click", createPlaylist);

  // save playlist name to local storage
  var createPlaylist = $("#create-playlist");
  function createPlaylist(event) {
    var playlistNameInput = document.querySelector("#playlist-name-input");
    event.preventDefault();
    console.log("Button Works!!");
    console.log(playlistNameInput);

    // var data = {
    //   playlistName: playlistName.value,
    // };
    // playlistNameInput.push(data)
var playlistName = $("#playlist-name");
    localStorage.setItem("createPlaylist", "playlistName");
    localStorage.getItem("playlistName" == "playlistNameInput");
    // playlistName.value = localStorage.getItem("playlistName");
  }
});

// add listner for click event
var searchButton = $("#search-button");
searchButton.on("click", getMusic);

function getMusic(event) {
  event.preventDefault();
  console.log("Button Works!!");

  // save to local storage
  var playlistArtist = $("#playlist-artist").val();
  // get user input that was saved in localStorage
  // [=]

  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
      playlistArtist +
      "&appid=" +
      APIKey,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3be84550c5msh6225c2c3674dcaep112662jsn51bef5314860",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    //for loop, for loop is going to run for the length/duration, then create an HTML card or element that includes an add button, in the for loop we'll attach event listeners, then append it to the HTML, then work on the function for the add button
  });
}
