/**
 * Construit un élément DOM pour un filtre.
 * @param {Object} filter - Objet représentant un filtre.
 * Donné reçu en paramètre de la fonction displayFilters.
 * @returns Un élément DOM représentant le travail.
 */
export const constructFilter = (filter) => {
  const filterDiv = document.createElement("li");
  filterDiv.classList.add("filter_item");
  filterDiv.setAttribute("data-category", filter.name);
  filterDiv.innerHTML = `${filter.name}`;
  return filterDiv;
};
