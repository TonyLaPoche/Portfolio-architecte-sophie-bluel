/**
 * Construit un élément DOM pour un filtre.
 * @param {{name: string, id: number,}} filter  - Objet représentant un filtre..
 * Donné reçu en paramètre de la fonction displayFilters.
 * @returns {HTMLLIElement} Un élément DOM représentant les filtres
 */
const constructFilter = (filter) => {
  const filterDiv = document.createElement("li");
  filterDiv.classList.add("filter_item");
  filterDiv.setAttribute("data-category", filter.name);
  filterDiv.innerHTML = `${filter.name}`;
  return filterDiv;
};

/**
 *
 * @returns {HTMLLIElement} Un élément DOM représentant le filtre par défaut
 * @description Cette fonction construit un élément DOM représentant le filtre par défaut
 * qui correspond à la catégorie "Tous".
 * @example
 * const defaultFilter = constructDefaultFilter();
 * console.log(defaultFilter); //  <li class="filter_item filter_item_active" data-category="all">Tous</li>
 *
 */
const constructDefaultFilter = () => {
  const defaultFilter = document.createElement("li");
  defaultFilter.classList.add("filter_item");
  defaultFilter.setAttribute("data-category", "all");
  defaultFilter.setAttribute("role", "listitem");
  defaultFilter.classList.add("filter_item_active");
  defaultFilter.innerHTML = "Tous";
  return defaultFilter;
};

/**
 * @description Construit un élément DOM pour une liste de filtres.
 * @param {{name: string, id: number}[]} filters  - Objet représentant un filtre.
 * @returns  {HTMLUListElement} Un élément DOM représentant la liste des filtres
 */
export const constructFilterList = (filters) => {
  const filtersUnorderedList = document.createElement("ul");
  filtersUnorderedList.setAttribute("id", "filters_list");
  filtersUnorderedList.setAttribute("role", "list");
  filtersUnorderedList.appendChild(constructDefaultFilter());
  filters.forEach((filter) => {
    const filterDiv = constructFilter(filter);
    filtersUnorderedList.appendChild(filterDiv);
  });
  return filtersUnorderedList;
};
