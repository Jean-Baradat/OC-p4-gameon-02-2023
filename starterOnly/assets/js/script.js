function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const content = document.querySelector(".content");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = screen.height <= 800 || screen.width <= 500 ? "block" : "flex";
  // document.querySelector("body").style.overflow = "hidden";
  // To get the scroll position of current webpage
  let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  console.log(window.pageYOffset);
  console.log(document.documentElement.scrollTop);


  // if scroll happens, set it to the previous value
  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll);
  };
}

// Close modal form
document.querySelector(".close").addEventListener("click", () => {
  content.classList.add("content--is-closed");
});

// when animation in "content" DOM element is finished
content.addEventListener('animationend', (event) => {
  // if this is the end of modalclose animation
  if (event.animationName === "modalclose") {
    modalbg.style.display = "none";
    content.classList.remove("content--is-closed");
    // document.querySelector("body").style.overflow = "auto";
    window.onscroll = function () { };
  }
});

document.querySelector("#first").addEventListener("input", () => {
  console.log("test");
});

window.addEventListener('load', () => {
  // ICI
});