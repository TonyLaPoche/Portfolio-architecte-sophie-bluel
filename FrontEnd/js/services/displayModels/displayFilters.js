import { filtersHandlers } from "../handlers/filterHandler.js";
import { constructFilter } from "../DomConstructor/filterConstructor.js";
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
  const filtersUnorderedList = document.createElement("ul");
  filtersUnorderedList.setAttribute("id", "filters_list");
  filtersCible.appendChild(filtersUnorderedList);
  const defaultFilter = document.createElement("li");
  defaultFilter.classList.add("filter_item");
  defaultFilter.setAttribute("data-category", "all");
  defaultFilter.classList.add("filter_item_active");
  defaultFilter.innerHTML = "Tous";
  filtersUnorderedList.appendChild(defaultFilter);

  filters.forEach((filter) => {
    const filterDiv = constructFilter(filter);
    filtersUnorderedList.appendChild(filterDiv);
  });
  filtersHandlers();
};
