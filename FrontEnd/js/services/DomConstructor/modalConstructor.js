import { handleClose } from "../authentification/handler/modifyHandler.js";
import { displayModal } from "../displayModels/displayModal.js";
import { getWorksStates } from "../statements/stateManagers.js";
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

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "close";

  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";

  closeButton.appendChild(closeIcon);

  handleClose(closeButton);

  const title = document.createElement("h2");
  title.textContent = "Galerie photo";

  modalHead.appendChild(closeButton);
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

  modalFooter.appendChild(addButton);

  modalContent.appendChild(modalHead);
  modalContent.appendChild(modalMain);
  modalContent.appendChild(separator);
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);

  return modal;
};
