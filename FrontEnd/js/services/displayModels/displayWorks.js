import { constructWork } from "../DomConstructor/workConstructor.js";

/**
 * Affiche les travaux dans la galerie à l'id gallery.
 * @param {Array} works - Tableau des travaux à afficher.
 */
export const displayWorks = async (works) => {
  // console.log("works", works);
  const worksCible = document.querySelector("#gallery");
  worksCible.innerHTML = "";
  works.forEach((work) => {
    let workDiv = constructWork(work);
    worksCible.appendChild(workDiv);
  });
};
