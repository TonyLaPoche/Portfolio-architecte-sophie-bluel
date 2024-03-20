import { displayModal } from "../../../displayModels/displayModal.js";

/**
 * Ajoute un écouteur d'événement sur le bouton passé en paramètre.
 * Lorsque le bouton est cliqué, la fonction displayModal() est appelée.
 * Si un element avec l'ID #modal existe déjà, la fonction ne fait rien.
 * @param {HTMLButtonElement} button
 */
export const modalOpenHandler = (button) => {
  button.addEventListener("click", () => {
    if (document.getElementById("modal")) {
      return;
    }
    displayModal(true);
  });
};
