const hslEnumKeys = Object.freeze([
  Utility.HSL_ENUM.Hue,
  Utility.HSL_ENUM.Level,
  Utility.HSL_ENUM.Saturation,
]);
const PALETE_SIZE = 5;
let initialColors = Array(PALETE_SIZE);
let isLocked = Array(PALETE_SIZE).fill(false);

const colorDivs = document.querySelectorAll(".color");
const generateBnt = document.querySelector(".generate");
const slidersAll = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
const copyContainer = document.querySelector(".copy-container");
const adjustButtons = document.querySelectorAll(".adjust");
const lockButtons = document.querySelectorAll(".lock");
const closeAdjustments = document.querySelectorAll(".close-adjustment");

window.addEventListener("DOMContentLoaded", init);
generateBnt.addEventListener("click", randomColors);

copyContainer.addEventListener("transitionend", ($event) => {
  copyContainer.classList.remove("active");
  copyContainer.firstElementChild.classList.remove("active");
});

slidersAll.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

//event listeners for element of each color
for (let i = 0; i < PALETE_SIZE; i++) {
  currentHexes[i].addEventListener("click", copyToClipBoard);
  adjustButtons[i].addEventListener("click", toggleAdjustmentPanel);
  closeAdjustments[i].addEventListener("click", toggleAdjustmentPanel);
  lockButtons[i].addEventListener("click", ($event) => {
    toggleColorLock($event, i);
  });
}

function init() {
  randomColors();
}

function randomColors() {
  colorDivs.forEach((colorDiv, index) => {
    //dont change if locked
    if (isLocked[index]) return;
    // set a random color
    let hexText = colorDiv.firstElementChild;
    let hexColor = Utility.generateHex();
    hexText.innerHTML = hexColor;
    colorDiv.style.backgroundColor = hexColor;
    initialColors[index] = hexColor;

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

  //set hex text and contrast
  colorDiv.firstElementChild.innerHTML = color;
  let foregroundColor = Utility.getForegroundColor(color);
  colorDiv.style.color = foregroundColor;
}

function copyToClipBoard($event) {
  let textArea = document.createElement("textarea");
  textArea.value = $event.target.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  //popup animation
  copyContainer.classList.add("active");
  copyContainer.firstElementChild.classList.add("active");
}

function toggleAdjustmentPanel($event) {
  if ($event.target.classList.contains("adjust")) {
    var adjustmentPanel = $event.target.parentElement.nextElementSibling;
  } else if ($event.target.classList.contains("close-adjustment")) {
    var adjustmentPanel = $event.target.parentElement;
  }
  adjustmentPanel.classList.toggle("active");
}

function toggleColorLock($event, index) {
  isLocked[index] = !isLocked[index];
  let target = $event.target.firstElementChild;
  target.classList.toggle("fa-lock");
  target.classList.toggle("fa-lock-open");
}
