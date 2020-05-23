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
saveBtn.addEventListener("click", () => togglePopupState(savePopup));
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
  LocalStore.addToLocal({
    name: saveNameInput.value,
    value: [...currentHexes.values()].map((el) => el.innerHTML),
  });
  saveNameInput.value = "";
  togglePopupState(savePopup);
}
