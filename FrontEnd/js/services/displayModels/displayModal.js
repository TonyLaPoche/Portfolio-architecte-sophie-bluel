import { modalConstructor } from "../DomConstructor/modalConstructor.js";

export const displayModal = (hasModal) => {
  const body = document.querySelector("body");
  if (document.getElementById("modal") === null && hasModal) {
    body.appendChild(modalConstructor());
  } else if (document.getElementById("modal") !== null && !hasModal) {
    body.removeChild(document.getElementById("modal"));
  }
};
