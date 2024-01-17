import { constructWork } from "../utils/workConstructor.js";

/**
 * Affiche les travaux dans la galerie à l'id gallery.
 * @param {Array} works - Tableau des travaux à afficher.
 */
export const displayWorks = (works) => {
  const worksCible = document.querySelector("#gallery");
  worksCible.innerHTML = "";
  works.forEach((work) => {
    const workDiv = constructWork(work);
    worksCible.appendChild(workDiv);
  });
};
