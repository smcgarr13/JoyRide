var APIKey = "3be84550c5msh6225c2c3674dcaep112662jsn51bef5314860";
// var APIKey = "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121";

var playlist = ["How I Got Over", "Sometimes I Rhyme Slow", "On A Sunday Afternoon", "ATLiens", "Can I Kick It?", "Summertime In the LBC", "Hate It Or Love It","Feel Me Flow", "Shimmy Shimmy Ya", "Still Not a Player", "What You Know", "Overnight Celebrity", "Black and Yellow", "Young, Wild & Free"];


// I want to play my playlist using Deezer API

// can we make this dynamic?
// determine API endpoint
// get API Key
// make request with API from JS
// create search text field so user can search for playlist??? or could this just be a visual icon??? 
// create media player buttons so user can play, rewind, fast-forward, etc.
// dynamically play songs
// add event listener for button function 
// press play button and music plays (and other buttons complete their functions as pressed)
// when current song ends, the next song will begin to play automatically and all details will populate onto the player (song name, artist name, and album name & image)
// if user pauses the player or closes the app, the stop point will be saved to local storage so the user can pick up where they left off


$(document).ready(function () {
    const settings = {
        async: true,
        crossDomain: true,
        url:
          "https://deezerdevs-deezer.p.rapidapi.com/search?q=",
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "f81d281d6amsh310843a7957d922p1d1b9cjsn8e63eaaea121",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };
    
      $.ajax(settings).done(function (response) {
        console.log(response);

        // add listner for click event
// $(document).ready(function () {
    $("ul.list.li").click(function() {
        $("ul.list.li").removeClass("active");
        $(this).addClass("active");
    
        let trackId = $(this).attr("track-id");
        $(".single .track").removeClass("active");
        $(trackId).addClass("active");
      });
    
            let audio = {};
            audio["track"] = new Audio();

      audio["track"].addEventListener("canplaythrough", function() {
        $(".time").html(new Date(Math.round(audio["track"].duration) * 1000).toISOString().substr(11, 8));
      });
    

      let interval;
      let pIndex = 0;
      $(".play").click(function() {
        console.log("Button Works!!");
    
        var randomArtist = Math.floor(Math.random() * playlist.length)

        const settings = {
          async: true,
          crossDomain: true,
          url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + playlist [randomArtist],
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "3be84550c5msh6225c2c3674dcaep112662jsn51bef5314860",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        };
        
        $.ajax(settings).done(function (response) {
          console.log(response);
          console.log(response.data[0].preview)
          console.log(response.data[0].title)
          console.log(response.data[0].artist.name)
          console.log(response.data[0].album.cover_medium)

          //variables, query selectors & text content
          var songName = $("#song-name");
          songName.text(response.data[0].title);

          var artistName = $("#artist-name");
          artistName.text(response.data[0].artist.name);

          var albumCover = $("#album-cover");
          albumCover.attr("src", response.data[0].album.cover_medium);


          let audioURL = response.data[0].preview;

          //   "https://deezerdevs-deezer.p.rapidapi.com/radio/%7Bid%7D";
          
            
          audio["track"].src = audioURL;

          setTimeout(function() {
  
              let audioDuration = Math.round(audio["track"].duration);
              let itemInterval = audioDuration;
          
              if (isPlaying(audio["track"])) {
                audio["track"].pause();
                $(".play svg").removeClass("fa-pause").addClass("fa-play");
          
                clearInterval(interval);
              } else {
                audio["track"].play();
                $(".play svg").removeClass("fa-play").addClass("fa-pause");
          
                interval = setInterval(() => {
                  pIndex++;
                  if (audio["track"].currentTime >= audioDuration) {
                    clearInterval(interval);
                    audio["track"].pause();
                    pIndex = 1;
                    audio["track"].currentTime = 0;
                    $(".play svg").removeClass("fa-pause").addClass("fa-play");
                  }
                  $(".time").html(new Date(Math.round(audio["track"].currentTime) * 1000).toISOString().substr(11, 8));
          
                  $(".seekbar-inner").css({ width: pIndex / 10 + "%" });
                }, itemInterval);
              }
            }, 200);

      });
  });
  });
  
  function isPlaying(audElem) {
      return !audElem.paused;
    };


});

// want audio player to automatically play the next song

// once current song ends, the next song will begin to play
// need function to play next song automatically
// would we need a for loop to achieve this?
// 



// want the current play button to start the playlist and pause the song when pressed again

// create if/else statement to change the play function to pause
// create if/else statement to change the pause function back to play



//want status bar to reset when a new song starts

// clear interval when current song ends?




// want the songs in queue to show in the smaller windows

// 