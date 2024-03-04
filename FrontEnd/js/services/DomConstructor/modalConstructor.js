import { modalCloseHandler } from "../authentification/handler/modalCloseHandler.js";
import { modalStepAddingHandler } from "../authentification/handler/modalStepAddingHandler.js";
import { modalStepGalleryHandler } from "../authentification/handler/modalStepGalleryHandler.js";
import { displayModal } from "../displayModels/displayModal.js";
import { getWorksStates } from "../statements/stateManagers.js";
import { workModalConstructor } from "./workModalConstructor.js";

export const modalConstructor = () => {
  // Modal Views
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal";
  modal.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      displayModal(false);
    }
  });

  // Modal Container
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.id = "modal-content";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "Ajouter une photo";

  // Modal Head
  const modalHead = document.createElement("div");
  modalHead.className = "modal-head";

  // Modal Head Buttons
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
  closeButton.appendChild(closeIcon);

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "previous";
  const previousIcon = document.createElement("i");
  previousIcon.className = "fa-solid fa-arrow-left";
  previousButton.appendChild(previousIcon);

  const title = document.createElement("h2");
  title.textContent = "Galerie photo";

  divHeadButton.appendChild(closeButton);
  modalHead.appendChild(title);

  // Modal Main
  const modalMain = document.createElement("div");
  modalMain.className = "modal-main";
  let works = getWorksStates();
  workModalConstructor(modalMain, works);

  // separator
  const separator = document.createElement("hr");
  separator.className = "separator";

  // Modal Footer
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.appendChild(addButton);

  // DOM CONSTRUCTION //
  // ( construction de la modal ) //
  modalContent.appendChild(modalHead);
  modalContent.appendChild(modalMain);
  modalContent.appendChild(separator);
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);

  // HANDLERS //
  // ( ouverture/fermeture de la modal, ajout d'une photo, retour à l'étape précédente )

  modalCloseHandler(closeButton);

  modalStepAddingHandler(addButton, divHeadButton, title, previousButton);

  modalStepGalleryHandler(
    previousButton,
    divHeadButton,
    title,
    addButton,
    modalMain,
    works
  );
  return modal;
};
