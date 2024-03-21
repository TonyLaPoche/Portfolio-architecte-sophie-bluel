import { filtersHandlers } from "../handler/filterHandler.js";
import { constructFilterList } from "../domConstructor/filterConstructor.js";

/**
 * @description Affiche les filtres sur la page d'accueil.
 * @param {Promise<{ id: number; name: string;}[]>} filters - Les catégories de travaux à afficher.
 * @returns Ajoute des ELements HTML à la balise ID "Filters" sont affichés via la méthode de constructionFilterList.
 */
export const displayFilters = async (filters) => {
  const filtersCible = document.querySelector("#filters");
  filtersCible.innerHTML = "";
  filtersCible.appendChild(constructFilterList(filters));
  filtersHandlers();
};
