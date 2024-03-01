import { modalCloseHandler } from "../authentification/handler/modalCloseHandler.js";
import { displayModal } from "../displayModels/displayModal.js";
import { stepModalHandler } from "../handlers/StepModalHandler.js";
import { getStepModal, getWorksStates } from "../statements/stateManagers.js";
import { workModalConstructor } from "./workModalConstructor.js";

export const modalConstructor = () => {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal";
  modal.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      displayModal(false);
    }
  });
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.id = "modal-content";

  const modalHead = document.createElement("div");
  modalHead.className = "modal-head";
  const divHeadButton = document.createElement("div");
  divHeadButton.className = "head-buttons";
  divHeadButton.style.display = "flex";
  divHeadButton.style.flexDirection = "row-reverse";

  modalHead.appendChild(divHeadButton);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "close";

  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "previous";
  const previousIcon = document.createElement("i");
  previousIcon.className = "fa-solid fa-arrow-left";
  previousButton.appendChild(previousIcon);

  closeButton.appendChild(closeIcon);

  modalCloseHandler(closeButton);

  const title = document.createElement("h2");
  title.textContent = "Galerie photo";

  divHeadButton.appendChild(closeButton);
  modalHead.appendChild(title);

  const modalMain = document.createElement("div");

  modalMain.className = "modal-main";
  let works = getWorksStates();
  workModalConstructor(modalMain, works);

  const separator = document.createElement("hr");
  separator.className = "separator";

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "Ajouter une photo";
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    stepModalHandler("adding");
    console.log("stepModal ADDING", getStepModal());
    document.querySelector(".modal-main").innerHTML = "";
    if (getStepModal() === "adding") {
      divHeadButton.prepend(previousButton);
      divHeadButton.style.flexDirection = "row";
      divHeadButton.style.justifyContent = "space-between";
      title.textContent = "Ajout photo";
      addButton.disabled = true;
      addButton.textContent = "valider";
    }
  });

  previousButton.addEventListener("click", (e) => {
    e.preventDefault();
    stepModalHandler("gallery");
    console.log("stepModal PREVIOUS", getStepModal());
    if (getStepModal() === "gallery") {
      divHeadButton.style.flexDirection = "row-reverse";
      divHeadButton.style.justifyContent = "flex-start";
      divHeadButton.removeChild(previousButton);
      title.textContent = "Galerie photo";
      addButton.textContent = "Ajouter une photo";
      addButton.disabled = false;
    }
    document.querySelector(".modal-main").innerHTML = "";
    workModalConstructor(modalMain, works);
  });

  modalFooter.appendChild(addButton);

  modalContent.appendChild(modalHead);
  modalContent.appendChild(modalMain);
  modalContent.appendChild(separator);
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);

  return modal;
};
