import { workModalConstructor } from "../../DomConstructor/workModalConstructor.js";
import { setStepModalHandler } from "../../handlers/StepModalHandler.js";
import { getStepModal } from "../../statements/stateManagers.js";

/**
 *
 * @param {HTMLButtonElement} button
 * @param {HTMLDivElement} divHeadButton
 * @param {HTMLHeadingElement} title
 * @param {HTMLButtonElement} addButton
 * @param {HTMLDivElement} modalMain
 * @param {{}[]} works
 */
export const modalStepGalleryHandler = (
  button, // ELEMENT HTML <bouton> de la modal galerie, pour revenir à l'étape précédente
  divHeadButton, // Header de la modal
  title, // titre de la modal
  addButton, // Bouton d'ajout de photo contenu dans le footer de la modal
  modalMain, // ELEMENT HTML <div> de la modal
  works // Liste des oeuvres
) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    setStepModalHandler("gallery");
    if (getStepModal() === "gallery") {
      divHeadButton.style.flexDirection = "row-reverse";
      divHeadButton.style.justifyContent = "flex-start";
      divHeadButton.removeChild(button);
      title.textContent = "Galerie photo";
      addButton.textContent = "Ajouter une photo";
      addButton.disabled = false;
    }
    document.querySelector(".modal-main").innerHTML = "";
    workModalConstructor(modalMain, works);
  });
};
