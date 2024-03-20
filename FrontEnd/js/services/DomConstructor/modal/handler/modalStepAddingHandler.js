import workModalAddingConstructor from "../../workModalAddingConstructor.js";
import { callApi } from "../../../api/utils/callApi.js";
import {
  addWorkStates,
  getNewWorkStates,
  getStepModal,
  newWorkHasValidData,
  resetNewWorkStates,
} from "../../../statements/stateManagers.js";

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
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    divHeadButton.prepend(previousButton);
    divHeadButton.style.flexDirection = "row";
    divHeadButton.style.justifyContent = "space-between";
    title.textContent = "Ajout photo";
    button.disabled = true;
    button.textContent = "valider";

    const modalMain = document.querySelector(".modal-main");
    modalMain.innerHTML = "";
    workModalAddingConstructor(modalMain);

    // Adding a work modal Constructor
    if (getStepModal() === "validation") {
      if (newWorkHasValidData()) {
        const newWork = getNewWorkStates();
        const option = {
          method: "POST",
          body: newWork,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
        const data = await callApi("works", option);
        addWorkStates(data);
        resetNewWorkStates();
        previousButton.click();
      } else {
        alert("Veuillez remplir tous les champs");
      }
    }
  });
};
