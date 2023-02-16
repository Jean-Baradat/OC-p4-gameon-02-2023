window.addEventListener('load', windowLoaded);

function windowLoaded() {

    // DOM ------------------------------------------------------------
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    // const formData = document.querySelectorAll(".formData");
    const content = document.querySelector(".content");
    const modalCloseBtn = document.querySelector(".close");
    const formFirstName = document.querySelector("#first");

    // Event ----------------------------------------------------------
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
    modalCloseBtn.addEventListener("click", closeModal);
    content.addEventListener("animationend", stopAnimation);
    formFirstName.addEventListener("input", handleFormFirstName)


    // Function -------------------------------------------------------
    function editNav() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    function launchModal() {
        modalbg.style.display = screen.height <= 800 || screen.width <= 500 ? "block" : "flex";
        let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
        let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }

    function closeModal() {
        content.classList.add("content--is-closed");
    }

    // when animation in "content" DOM element is finished
    function stopAnimation(event) {
        // if this is the end of modalclose animation
        if (event.animationName === "modalclose") {
            modalbg.style.display = "none";
            content.classList.remove("content--is-closed");
            window.onscroll = function () { };
        }
    }

    function handleFormFirstName() {
        console.log("test");
    }
}