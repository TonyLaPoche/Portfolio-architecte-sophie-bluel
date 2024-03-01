import { deleteWorkStatesById } from "../statements/stateManagers.js";

const handleDeleteItem = (e) => {
  const id = e.currentTarget.parentNode.parentNode
    .getAttribute("data-id")
    .split("-")[1];
  deleteWorkStatesById(id);
  console.log("delete", id);
  return;
};

/**
 * @async
 * @function workModalConstructor
 * @param {HTMLElement} modalMain
 * @description Cette fonction permet de construire le contenu de la modal de la galerie photo. Elle récupère les données des oeuvres et les affiche dans la modal.
 */
export const workModalConstructor = (modalMain, works) => {
  const ul = document.createElement("ul");
  ul.className = "gallery-list";
  for (let i = 0; i < works.length; i++) {
    const li = document.createElement("li");
    li.className = "gallery-item";
    li.setAttribute("data-id", "works-" + works[i].id); // rend unique l'id de chaque oeuvre

    const figure = document.createElement("figure");
    figure.setAttribute("data-title", works[i].title);

    const img = document.createElement("img");
    img.src = works[i].imageUrl;
    img.alt = works[i].title;

    const button = document.createElement("button");
    button.type = "button";

    button.className = "gabargeIcon";

    button.addEventListener("click", (e) => {
      e.preventDefault();
      handleDeleteItem(e);
    });

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can";

    button.appendChild(trashIcon);
    figure.appendChild(img);
    figure.appendChild(button);
    li.appendChild(figure);
    ul.appendChild(li);
  }
  modalMain.appendChild(ul);
};
