import { constructFilter } from "../utils/filterConstructor.js";

/**
 * Affiche les travaux dans la galerie à l'id gallery.
 * @param {Array} works - Tableau des travaux à afficher.
 */
export const displayFilters = (filters) => {
  const filtersCible = document.querySelector("#filters");
  filtersCible.innerHTML = "";
  const filtersUnorderedList = document.createElement("ul");
  filtersUnorderedList.setAttribute("id", "filters_list");
  filters.forEach((filter) => {
    const filterDiv = constructFilter(filter);
    filtersCible.appendChild(filterDiv);
  });
};
