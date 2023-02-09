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
  modalbg.style.display = "block";
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
  }
});

