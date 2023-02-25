window.addEventListener('load', windowLoaded);
function windowLoaded() {
    // Variable ------------------------------------------------------ 
    const regexFullName = /^(?!.*(?:--|''))[A-Za-zÀ-ÖØ-öø-ſ ]{2,}(?:[-' ]{1,}[A-Za-zÀ-ÖØ-öø-ſ ]+)*$/;
    const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const regexBirthDate = /^((19|20)\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    const regexNbrTournaments = /^(0|[1-9]\d?|99)$/;
    const listRegex = [regexFullName, regexFullName, regexMail, regexBirthDate, regexNbrTournaments];
    var switchTest = false;
    var NbrInputUnchecked = 0;

    // DOM ------------------------------------------------------------
    const html = document.querySelector(".html");
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const content = document.querySelector(".content");
    const modalCloseBtn = document.querySelector(".close");
    const textControl = document.querySelectorAll(".text-control");
    const formRegister = document.querySelector("form[name='reserve']");
    const checkbox1 = document.querySelector("#checkbox1");
    const isNecessaryCheckbox = document.querySelector(".is-necessary");
    const formFieldsInfos = document.querySelectorAll(".form-fields-infos");
    const inputLocation = document.querySelectorAll("input[name='location']");
    const messSuccessSubmit = document.querySelector(".mess-success-submit");

    // Event ----------------------------------------------------------
    formRegister.addEventListener("submit", tryToSubmit);
    modalCloseBtn.addEventListener("click", closeModal);
    content.addEventListener("animationend", stopAnimation);
    checkbox1.addEventListener("change", checkbox1Change);
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
    textControl.forEach((input) => input.addEventListener("input", handleFormTextControl));
    inputLocation.forEach((input) => input.addEventListener("input", handleInputLocation));

    // Function -------------------------------------------------------
    /**
     * Function when register form modal is open
     */
    function launchModal() {
        modalbg.style.display = window.innerHeight <= 890 || window.innerWidth <= 500 ? "block" : "flex";
        let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
        let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

        // undisplay window scroll bar
        html.style.overflow = "hidden";
        html.style.paddingRight = "17px";

        // set the scroll position
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }

    /**
     * Function when register form modal is closed
     */
    function closeModal() {
        content.classList.add("content--is-closed");
    }

    /**
     * Function when animation in "content" DOM element is finished
     * @param {object} event 
     */
    function stopAnimation(event) {
        // if this is the end of modalclose animation
        if (event.animationName === "modalclose") {
            modalbg.style.display = "none";
            content.classList.remove("content--is-closed");

            // reset to initial scroll
            window.onscroll = null;

            // display window scroll bar
            html.style.overflow = "auto";
            html.style.paddingRight = "0";

            // reset all register form value and helper
            formRegister.reset();
            switchTest = false;
            formRegister.style.display = "block";
            messSuccessSubmit.style.display = "none";
            isNecessaryCheckbox.style.boxShadow = "none";
            for (let i = 0; i <= 6; i++) {
                if (i <= 4) {
                    textControl[i].style.boxShadow = "none";
                }
                formFieldsInfos[i].style.visibility = "hidden";
                formFieldsInfos[i].style.height = "0";
            }
        }
    }

    /**
     * Handle register form helper when enter data : textControl (first name, last name, email, birthdate, GameOn tournaments)
     */
    function handleFormTextControl() {
        for (let i = 0; i <= 4; i++) {
            textControl[i].style.boxShadow = "0 0 0 3px green";
            formFieldsInfos[i].style.visibility = "hidden";
            formFieldsInfos[i].style.height = "0";
            if (!listRegex[i].test(textControl[i].value) || !/^(?!\s*$).+/.test(textControl[i].value)) {
                textControl[i].style.boxShadow = "0 0 0 3px red";
                formFieldsInfos[i].style.visibility = "visible";
                formFieldsInfos[i].style.height = "inherit";
                if (textControl[i].value === "" && !switchTest) {
                    textControl[i].style.boxShadow = "none";
                    formFieldsInfos[i].style.visibility = "hidden";
                    formFieldsInfos[i].style.height = "0";
                }
            }
        }
    }

    /**
     * Handle checkbox needed of register form : checkbox1 (the terms of use)
     */
    function checkbox1Change() {
        if (this.checked) {
            isNecessaryCheckbox.style.boxShadow = "none";
            formFieldsInfos[6].style.visibility = "hidden";
            formFieldsInfos[6].style.height = "0";
        } else {
            isNecessaryCheckbox.style.boxShadow = "0 0 0 3px red";
            formFieldsInfos[6].style.visibility = "visible";
            formFieldsInfos[6].style.height = "inherit";
        }
    }

    /**
     * Handle radio button needed of register form : inputLocation (GameOn Tournament location)
     */
    function handleInputLocation() {
        formFieldsInfos[5].style.visibility = "hidden";
        formFieldsInfos[5].style.height = "0";
    }

    /**
     * Function when the register form is try to submit 
     * @param {object} event 
     * @returns {boolean} false
     */
    function tryToSubmit(event) {
        // stop default form event
        event.preventDefault();

        var isReadyToSubmit = true;
        NbrInputUnchecked = 0;

        // test all register form input
        for (let i = 0; i <= 4; i++) {
            textControl[i].style.boxShadow = "0 0 0 3px green";
            formFieldsInfos[i].style.visibility = "hidden";
            formFieldsInfos[i].style.height = "0";
            if (!listRegex[i].test(textControl[i].value) || !/^(?!\s*$).+/.test(textControl[i].value)) {
                textControl[i].style.boxShadow = "0 0 0 3px red";
                formFieldsInfos[i].style.visibility = "visible";
                formFieldsInfos[i].style.height = "inherit";
                isReadyToSubmit = false;
            }
        }

        // test if one radio button is selected
        for (let i = 0; i < inputLocation.length; i++) {
            if (!inputLocation[i].checked) {
                NbrInputUnchecked++;
                formFieldsInfos[5].style.visibility = "hidden";
                formFieldsInfos[5].style.height = "0";
                if (NbrInputUnchecked === 6) {
                    formFieldsInfos[5].style.visibility = "visible";
                    formFieldsInfos[5].style.height = "inherit";
                    isReadyToSubmit = false;
                }
            }
        }

        // test if checkbox needed (the terms of use) is checked
        if (!checkbox1.checked) {
            isNecessaryCheckbox.style.boxShadow = "0 0 0 3px red";
            formFieldsInfos[6].style.visibility = "visible";
            formFieldsInfos[6].style.height = "inherit";
            isReadyToSubmit = false;
        }

        // final test with isReadyToSubmit if false nothing happen
        if (isReadyToSubmit === true) {
            // FORM IS SUCCESSFULLY SUBMITTED
            formRegister.style.display = "none";
            messSuccessSubmit.style.display = "block";
        } else {
            switchTest = true;
            return false;
        }
    }
}

/**
 * Handle responsive Menu
 */
function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}