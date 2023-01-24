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

// initialize player
// referenced: https://www.youtube.com/watch?v=WTwwX__o01M

initAudio ($("#playlist li:first-child"));

// initializer function
function initAudio (element) {
    var song = element.attr(".song");
    var title = element.text();
    var cover = element.attr(".cover");
    var artist = element.attr(".artist");
};
    
// create audio object

audio = new Audio ("media/" + song);

if (!audio.currentTime) {
    $("duration").html("00.00");
};

$("#audio-player .title").text(title);
$("#audio-player .artist").text(artist);

// insert cover

$("img.cover").attr("src", "img/covers/" + cover);

$("#playlist li").removeClass("active");
element.addClass("active");

// play button
$("#play").click(function() {
    console.log("Button Works!!")
    audio.play();
    // $("#play").hide;
    $("#duration").fadeIn(400)
    showDuration();

});

$('audio#pop')[0].play();