import { modalConstructor } from "../DomConstructor/modal/modalConstructor.js";
import { resetNewWorkStates } from "../statements/stateManagers.js";

/**
 * Cette fonction permet d'afficher ou de cacher un modal.
 * Si le modal existe déjà et que hasModal est faux, le modal est supprimé.
 * @param {boolean} hasModal
 */
export const displayModal = (hasModal) => {
  const body = document.querySelector("body");
  const modal = document.getElementById("modal");
  if (modal === null && hasModal) {
    body.appendChild(modalConstructor());
  } else if (modal && !hasModal) {
    body.removeChild(modal);
    resetNewWorkStates();
  }
};
