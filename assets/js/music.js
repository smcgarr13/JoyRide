// var APIKey = "3be84550c5msh6225c2c3674dcaep112662jsn51bef5314860";
var APIKey = "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121";
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
      "X-RapidAPI-Key": "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    //for loop, for loop is going to run for the length/duration, then create an HTML card or element that includes an add button, in the for loop we'll attach event listeners, then append it to the HTML, then work on the function for the add button

    //Audio Player
    // $('')

    //   });
    // }
  });
}

const settings2 = {
	"async": true,
	"crossDomain": true,
	"url": "https://deezerdevs-deezer.p.rapidapi.com/radio/KIIS%20fm",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


$(document).ready(function () {
  $("ul.list.li").click(function () {
    $("ul.list.li").removeClass("active");
    $(this).addClass("active");

    let trackID = $(this).attr("track-id");
    $(".single .track").removeClass("active");
    $(trackId).addClass("active");
  });

  let audioURL = "https://api.deezer.com/album/8938827/tracks";
  
//   "https://deezerdevs-deezer.p.rapidapi.com/radio/%7Bid%7D";

  let audio = {};
  audio["track"] = new Audio();
  audio["track"].src = audioURL;

  audio["track"].addEventListener("canplaythrough", function () {
    $(".time").html(
      new Date(Math.round(audio["music"].duration) * 1000)
        .toISOString()
        .substr(11, 8)
    );
  });

  let interval;
  let pIndex = 0;
  $(".play").click(function () {
    console.log("Button Works!!");

    let audioDuration = Math.round(audio["track"].duration);
    let itemTimeout = audioDuration;

    if (isPlaying(audio["track"])) {
      audio["track"].pause();
      $(".play svg").removeClass("fa-pause").addClass("fa-play");

      clearInterval(interval);
    } else {
      audio["track"].play();
      $("play svg").removeClass("fa-play").addClass("fa-pause");

      interval = setInterval(() => {
        pIndex++;
        if (audio["track"].currentTime >= audioDuration) {
          clearInterval(interval);
          audio["track"].pause();
          pIndex = 1;
          audio["track"].currentTime = 0;
          $(".play svg").removeClass("fa-pause").addClass("fa-play");
        }
        $(".time").html(
          new Date(Math.round(audio["track"].currentTime) * 1000)
            .toISOString()
            .substr(11, 8)
        );

        $(".seekbar-inner").css({ width: pIndex / 10 + "%" });
      }, itemInterval);
    }
  }, 200);
});

// });

function isPlaying(audElem) {
  return !audElem.paused;
}
