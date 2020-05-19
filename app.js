const hslEnumKeys = Object.freeze([
  Utility.HSL_ENUM.Hue,
  Utility.HSL_ENUM.Level,
  Utility.HSL_ENUM.Saturation,
]);
let initialColors = [];

const colorDivs = document.querySelectorAll(".color");
const generateBnt = document.querySelector(".generate");
const slidersAll = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

window.addEventListener("DOMContentLoaded", init);
slidersAll.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

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
    initialColors.push(hexColor);

    //balance contrast based in backround color
    let foregroundColor = Utility.getForegroundColor(hexColor);
    colorDiv.style.color = foregroundColor;

    let sliders = colorDiv.querySelectorAll('.sliders input[type="range"]');
    colourizeSlider(hexColor, sliders);

    setSliderPosition(hexColor, sliders);
  });
}

function colourizeSlider(hexColor, sliders) {
  //hue is set in css as its common for all
  for (let i = 1; i < 3; i++) {
    let hslLimits = Utility.getHslLimits(hexColor, hslEnumKeys[i]);
    sliders[
      i
    ].style.backgroundImage = `linear-gradient(to right, ${hslLimits[0]}, ${hslLimits[1]}, ${hslLimits[2]}`;
  }
}

function setSliderPosition(hexColor, sliders) {
  for (let i = 0; i < 3; i++) {
    // get hue, sat and val from chroma color object
    sliders[i].value = hexColor.get(hslEnumKeys[i]);
  }
}

function hslControls($event) {
  // find which color div is target
  let index =
    $event.target.getAttribute("data-hue") ||
    $event.target.getAttribute("data-bright") ||
    $event.target.getAttribute("data-sat");

  let colorDiv = colorDivs[index];
  let baseColor = initialColors[index];
  let sliders = colorDiv.querySelectorAll('input[type="range"]');

  // get hsl values from sliders
  let hslValues = [];
  for (let i = 0; i < 3; i++) {
    hslValues.push(sliders[i].value);
  }
  let color = Utility.setHSL(baseColor, hslValues);
  colorDiv.style.backgroundColor = color;
  colourizeSlider(color, sliders);
}
