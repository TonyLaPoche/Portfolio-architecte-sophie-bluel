import { displayModal } from "../../displayModels/displayModal.js";

export const modalOpenHandler = (button) => {
  button.addEventListener("click", () => {
    if (document.getElementById("modal")) {
      return;
    }
    displayModal(true);
  });
};
