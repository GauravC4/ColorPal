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
    // set a random color
    let hexText = colorDiv.firstElementChild;
    let hexColor = Utility.generateHex();
    hexText.innerHTML = hexColor;
    colorDiv.style.backgroundColor = hexColor;

    //balance contrast based in backround color
    let foregroundColor = Utility.getForegroundColor(hexColor);
    colorDiv.style.color = foregroundColor;

    let sliders = colorDiv.querySelectorAll('.sliders input[type="range"]');
    colourizeSlider(hexColor, sliders);
  });
}

function colourizeSlider(hexColor, sliders) {
  const hslEnumKeys = Object.freeze([
    Utility.HSL_ENUM.Hue,
    Utility.HSL_ENUM.Level,
    Utility.HSL_ENUM.Saturation,
  ]);
  //hue is set in css as its common for all
  for (let i = 1; i < 3; i++) {
    let hslLimits = Utility.getHslLimits(hexColor, hslEnumKeys[i]);
    sliders[
      i
    ].style.backgroundImage = `linear-gradient(to right, ${hslLimits[0]}, ${hslLimits[1]}, ${hslLimits[2]}`;
  }
}
