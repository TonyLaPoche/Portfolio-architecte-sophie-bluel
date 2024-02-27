import { filtersHandlers } from "../handlers/filterHandler.js";
import { constructFilterList } from "../DomConstructor/filterConstructor.js";
import { getCategoriesStates } from "../statements/stateManagers.js";

/**
 * Affiche les filtres dans l'élément avec l'ID "filters".
 * Cette méthode récupère les catégories à partir de l'API, crée les éléments de filtre correspondants
 * et les ajoute à la liste des filtres.
 * Enfin, elle appelle la méthode filterWorks() pour appliquer les filtres aux éléments.
 * @returns {Promise<void>} Une promesse résolue une fois que les filtres sont affichés.
 */
export const displayFilters = async () => {
  const filtersCible = document.querySelector("#filters");
  filtersCible.innerHTML = "";
  const filters = getCategoriesStates();
  filtersCible.appendChild(constructFilterList(filters));
  filtersHandlers();
};
