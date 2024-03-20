import { workModalMainConstructor } from "../../workModalMainConstructor.js";
import { displayWorks } from "../../../displayModels/displayWorks.js";
import { setStepModalHandler } from "../../../handlers/StepModalHandler.js";
import {
  fetchAllWorks,
  getStepModal,
  resetNewWorkStates,
} from "../../../statements/stateManagers.js";

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
  modalMain // ELEMENT HTML <div> de la modal
) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const works = await fetchAllWorks();
    setStepModalHandler("gallery");
    if (getStepModal() === "gallery") {
      divHeadButton.style.flexDirection = "row-reverse";
      divHeadButton.style.justifyContent = "flex-start";
      divHeadButton.removeChild(button);
      title.textContent = "Galerie photo";
      addButton.textContent = "Ajouter une photo";
      addButton.disabled = false;
      resetNewWorkStates();
    }

    document.querySelector(".modal-main").innerHTML = "";
    workModalMainConstructor(modalMain, works);
    displayWorks(works);
  });
};
