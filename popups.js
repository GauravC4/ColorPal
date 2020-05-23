const copyPopup = document.querySelector(".copy-popup");
const libraryBtn = document.querySelector("button.library");
const closeLibraryBtn = document.querySelector("button.library-close");
const libraryPopup = document.querySelector(".library-popup");
const saveBtn = document.querySelector("button.save");
const saveNameInput = document.querySelector(".save-name");
const submitSaveBtn = document.querySelector("button.submit-save");
const closeSaveBtn = document.querySelector("button.save-close");
const savePopup = document.querySelector(".save-popup");

libraryBtn.addEventListener("click", () => togglePopupState(libraryPopup));
saveBtn.addEventListener("click", () => {
  renderSavePopup();
  togglePopupState(savePopup);
});
closeLibraryBtn.addEventListener("click", () => togglePopupState(libraryPopup));
closeSaveBtn.addEventListener("click", () => togglePopupState(savePopup));
submitSaveBtn.addEventListener("click", savePalette);

function togglePopupState(element) {
  element.classList.toggle("active");
  element.parentElement.classList.toggle("active");
}

function savePalette() {
  let validity = saveNameInput.validity;
  if (validity.patternMismatch || validity.valueMissing) return;
  let palette = {
    name: saveNameInput.value,
    value: [...currentHexes.values()].map((el) => el.innerHTML),
  };
  LocalStore.addToLocal(palette);
  saveNameInput.value = "";
  togglePopupState(savePopup);
  toggleSaveStatus(palette.name);
  rePopulateLibrary();
}

function generateColorBand(colors) {
  let colorBand = document.createElement("div");
  colorBand.classList.add("color-band");
  if (!colors) colorBand;
  colors.forEach((color) => {
    let colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorBand.appendChild(colorDiv);
  });
  return colorBand;
}

function renderSavePopup() {
  let hexColors = [...currentHexes.values()].map((el) => el.innerHTML);
  let newColorBand = generateColorBand(hexColors);
  let colorBand = savePopup.querySelector(".color-band");
  if (colorBand) {
    colorBand.replaceWith(newColorBand);
  } else {
    savePopup.insertBefore(newColorBand, saveNameInput);
  }
}

function rePopulateLibrary() {
  let libElements = document.querySelectorAll(".library-element");
  Utility.removeChildren(libraryPopup, libElements);

  let local = LocalStore.getLocal();
  local.forEach((palette) => {
    let libElement = document.createElement("div");
    libElement.classList.add("library-element");

    let paletteName = document.createElement("h5");
    paletteName.innerHTML = palette.name;

    let previewDiv = document.createElement("div");
    previewDiv.classList.add("palette-preview");

    let selectBtn = document.createElement("button");
    selectBtn.innerHTML = "Select";
    selectBtn.classList.add("select-palette");
    selectBtn.addEventListener("click", pickFromLibrary);

    let colorBand = generateColorBand(palette.value);

    previewDiv.appendChild(colorBand);
    previewDiv.appendChild(selectBtn);

    libElement.appendChild(paletteName);
    libElement.appendChild(previewDiv);

    libraryPopup.appendChild(libElement);
  });
}

function pickFromLibrary($event) {
  let name = $event.target.parentElement.previousSibling.innerHTML;
  let palette = LocalStore.getFromLocal(name);
  changePallete(palette);
  togglePopupState(libraryPopup);

  // prioritize picked color palette
  let target = $event.target.closest(".library-element");
  let first = document.querySelectorAll(".library-element")[0];
  target.parentElement.insertBefore(target, first);
}
