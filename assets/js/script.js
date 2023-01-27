var menuEl = document.querySelector(".burger-menu");

var routerEl = document.querySelector(".router-form");

function openCLoseMenu(){
  menuEl.classList.toggle("hide");
}

function startRoute(){
  routerEl.classList.remove("hide")
}