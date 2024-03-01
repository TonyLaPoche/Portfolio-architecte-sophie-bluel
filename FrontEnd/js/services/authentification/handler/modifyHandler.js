import { displayModal } from "../../displayModels/displayModal.js";

export const handleClose = (button) => {
  button.addEventListener("click", () => {
    if (document.getElementById("modal") === null) {
      console.log("modal doesn't exist");
      return;
    }
    displayModal(false);
  });
};

export const handleOpen = (button) => {
  button.addEventListener("click", () => {
    if (document.getElementById("modal")) {
      console.log("modal already exist");
      return;
    }
    displayModal(true);
  });
};
