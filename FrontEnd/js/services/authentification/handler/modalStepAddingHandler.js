import { setStepModalHandler } from "../../handlers/StepModalHandler.js";
import { getStepModal } from "../../statements/stateManagers.js";

/**
 *
 * @param {HTMLButtonElement} button
 * @param {HTMLDivElement} divHeadButton
 * @param {HTMLHeadingElement} title
 * @param {HTMLButtonElement} previousButton
 */
export const modalStepAddingHandler = (
  button, // ELEMENT HTML <bouton> de la modal galerie, pour revenir à l'étape précédente
  divHeadButton, // Header de la modal
  title, // titre de la modal
  previousButton // Bouton précédent
) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    setStepModalHandler("adding");
    if (getStepModal() === "adding") {
      divHeadButton.prepend(previousButton);
      divHeadButton.style.flexDirection = "row";
      divHeadButton.style.justifyContent = "space-between";
      title.textContent = "Ajout photo";
      button.disabled = true;
      button.textContent = "valider";
    }
    document.querySelector(".modal-main").innerHTML = "";
  });
  // Adding a work modal Constructor
};
