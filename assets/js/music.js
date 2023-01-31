var APIKey = "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121";

var playlist = ["Now or Never, The Roots","Sometimes I Rhyme Slow","On A Sunday Afternoon","ATLiens","Can I Kick It?","Summertime In the LBC","Hate It Or Love It","Feel Me Flow","Shimmy Shimmy Ya","Still Not a Player","Overnight Celebrity","Black and Yellow","Young, Wild & Free"];

$(document).ready(function () {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=theroots",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

let audio = {};
    audio["track"] = new Audio();

    audio["track"].addEventListener("canplaythrough", function () {
      $(".time").html(
        new Date(Math.round(audio["track"].duration) * 1000)
          .toISOString()
          .substr(11, 8)
      );
    });

    // play next track automatically
    $(audio["track"]).on("ended", function () {
      var randomIndex = Math.floor(Math.random() * playlist.length);
      var nextTrack = playlist[randomIndex];
      const settings = {
        async: true,
        crossDomain: true,
        url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + nextTrack,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
          "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      // error catch for unfound tracks
      $.ajax(settings)
        .done(function (response) {
          if (response.data && response.data.length > 0) {
            audio["track"].src = response.data[0].preview;
            audio["track"].play();
          } else {
            console.log("Track not found in Deezer API");
          }
        })
        .fail(function (error) {
          console.log("Error with Deezer API call:", error);
        });

      $.ajax(settings).done(function (response) {
        audio["track"].src = response.data[0].preview;
        audio["track"].play();
        var randomIndex = Math.floor(Math.random() * playlist.length);
        var nextTrack = playlist[randomIndex];
        const settings = {
          async: true,
          crossDomain: true,
          url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + nextTrack,
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
            "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        };
      });
    });

    // play button function
    let interval;
    $(".play").click(function () {
      console.log("Button Works!!");
      if (isPlaying(audio["track"])) {
        audio["track"].pause();
        // $(".play svg").removeClass("fa-pause").addClass("fa-play");
        clearInterval(interval);
      } else {
        audio["track"].play();
        // $(".play svg").removeClass("fa-play").addClass("fa-pause");
      };

      var randomArtist = Math.floor(Math.random() * playlist.length);

      const settings = {
        async: true,
        crossDomain: true,
        url:
          "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
          playlist[randomArtist],
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
          "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };
    
      // pause button function
      $(".pause").click(function() {
        console.log("Button Works!!");

        let audioDuration = Math.round(audio["track"].duration);
        let itemInterval = audioDuration;

        if (isPlaying(audio["track"])) {
          audio["track"].pause();
          // $(".play svg").removeClass("fa-pause").addClass("fa-play");
        } else {
          audio["track"].play();
          // $(".play svg").removeClass("fa-play").addClass("fa-pause");
          clearInterval(itemInterval);
        }
      });

      // fast forward button function
      $(".next").click(function () {
        audio["track"].currentTime += 30;
      });

      // rewind button click function
      $(".prev").click(function () {
        audio["track"].currentTime += 30;
      });

      // track info/details
      $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.data[0].preview);
        console.log(response.data[0].title);
        console.log(response.data[0].artist.name);
        console.log(response.data[0].album.cover_medium);

        var songName = $(".song-name");
        songName.text(response.data[0].title);

        var artistName = $(".artist-name");
        artistName.text(response.data[0].artist.name);

        var albumCover = $(".album-cover");
        albumCover.attr("src", response.data[0].album.cover_medium);
        
        
        $(audio["track"]).on("ended", function() {
          // var randomIndex = Math.floor(Math.random() * playlist.length);
          // var nextTrack = playlist[randomIndex]
        });
   
        
        // audio duration function
        let audioURL = response.data[0].preview;
        audio["track"].src = audioURL;

        setTimeout(function() {
          let interval;
          let pIndex = 0;
          let audioDuration = Math.round(audio["track"].duration);
          let itemInterval = audioDuration;

          interval = setInterval(() => {
            pIndex++;
            if (audio["track"].currentTime >= audioDuration) {
              clearInterval(interval);
              audio["track"].pause();
              pIndex = 1;
              audio["track"].currentTime = 0;
            };

            $(".time").html(
              new Date(Math.round(audio["track"].currentTime) * 1000)
                .toISOString()
                .substr(11, 8)
            );

            $(".seekbar-inner").css({ width: pIndex / 10 + "%" });
          }, itemInterval);
        }, 200);
      });
    });
  });

  function isPlaying(audElem) {
    return !audElem.paused;
  };
});

