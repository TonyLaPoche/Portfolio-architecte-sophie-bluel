import { displayModal } from "../../../displayModels/displayModal.js";

export const modalCloseHandler = (button) => {
  button.addEventListener("click", () => {
    if (document.getElementById("modal") === null) {
      return;
    }
    displayModal(false);
  });
};
