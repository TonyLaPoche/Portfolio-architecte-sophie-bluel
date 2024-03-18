import { modifyConstructor } from "../DomConstructor/modifyConstructor.js";

/**
 * Cette fonction permet d'afficher les boutons de modification.
 * Elle utilise la fonction modifyConstructor() pour créer les éléments du DOM.
 * Ces éléments sont ensuite ajoutés à la div comportant l'ID #options.
 */
export const displayModify = () => {
  const modifyCible = document.querySelector("#options");
  const { svgElement, buttonElement } = modifyConstructor();
  modifyCible.appendChild(svgElement);
  modifyCible.appendChild(buttonElement);
};
