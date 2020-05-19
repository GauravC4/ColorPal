const colorDivs = document.querySelectorAll(".color");
const generateBnt = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

window.addEventListener("DOMContentLoaded", init);

function init() {
  randomColors();
}

function randomColors() {
  colorDivs.forEach((colorDiv) => {
    let hexText = colorDiv.firstElementChild;
    let hexColor = Utility.generateHex();
    hexText.innerHTML = hexColor;
    colorDiv.style.backgroundColor = hexColor;
    let foregroundColor = Utility.getForegroundColor(hexColor);
    colorDiv.style.color = foregroundColor;
  });
}
