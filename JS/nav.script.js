const burger = document.getElementById("burgerBtn");
const overlay = document.getElementById("overlay");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  overlay.classList.toggle("show");
  body.classList.toggle("noScroll");
});

var body = document.body;

// DARK MODE -----------------------------------------------------
let darkmode = localStorage.getItem("darkmode");

if (darkmode === null) {
    darkmode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "true" : "false";
    localStorage.setItem("darkmode", darkmode);
}

if (darkmode === "true") {
    body.classList.add("dark");
} else {
    body.classList.remove("dark");
}

// LANGUAGE ------------------------------------------------------
let language = localStorage.getItem("language");

if (language === null) {
    language = "ar"; // default
    localStorage.setItem("language", language);
}

body.setAttribute("lang", language);

// Dark toggle
function toggleView() {
    darkmode = darkmode === "true" ? "false" : "true";
    localStorage.setItem("darkmode", darkmode);

    body.classList.toggle("dark");
}

// Language toggle
function toggleLanguage() {
    language = language === "en" ? "ar" : "en";
    localStorage.setItem("language", language);

    body.setAttribute("lang", language);
}
