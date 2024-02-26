import { handleClose } from "../authentification/handler/modifyHandler.js";

export const modalConstructor = () => {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

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

  const ul = document.createElement("ul");
  ul.className = "gallery-list";
  for (let i = 0; i < 9; i++) {
    const li = document.createElement("li");
    li.className = "gallery-item";

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = "https://fakeimg.pl/350x200/?text=fake";
    img.alt = "Supprimer";

    const span = document.createElement("span");
    span.className = "gabargeIcon";
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can";

    span.appendChild(trashIcon);
    figure.appendChild(img);
    figure.appendChild(span);
    li.appendChild(figure);
    ul.appendChild(li);
  }

  modalMain.appendChild(ul);

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
