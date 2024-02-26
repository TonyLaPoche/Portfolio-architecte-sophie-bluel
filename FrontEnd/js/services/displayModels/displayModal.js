import { modalConstructor } from "../DomConstructor/modalConstructor.js";

export const displayModal = (hasModal) => {
  const body = document.querySelector("body");
  const modal = document.getElementById("modal");
  if (modal === null && hasModal) {
    body.appendChild(modalConstructor());
  } else if (modal && !hasModal) {
    body.removeChild(modal);
  }
};
