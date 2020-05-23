const libraryBtn = document.querySelector("button.library");
const closeLibraryBtn = document.querySelector("button.library-close");
const libraryPopup = document.querySelector(".library-popup");
const saveBtn = document.querySelector("button.save");
const closeSaveBtn = document.querySelector("button.save-close");
const savePopup = document.querySelector(".save-popup");

libraryBtn.addEventListener("click", () => togglePopupState(libraryPopup));
saveBtn.addEventListener("click", () => togglePopupState(savePopup));
closeLibraryBtn.addEventListener("click", () => togglePopupState(libraryPopup));
closeSaveBtn.addEventListener("click", () => togglePopupState(savePopup));

function togglePopupState(element) {
  element.classList.toggle("active");
  element.parentElement.classList.toggle("active");
}
