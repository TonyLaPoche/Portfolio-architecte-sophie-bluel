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

/**
 * Construit un élément DOM pour un travail.
 * @param {Object} work - Objet représentant un travail.
 * @returns Un élément DOM représentant le travail.
 */
export const constructFilter = (filter) => {
  const filterDiv = document.createElement("li");
  filterDiv.classList.add("filter_item");
  filterDiv.setAttribute("data-category", filter.name);
  filterDiv.innerHTML = `${filter.name}`;
  return filterDiv;
};
