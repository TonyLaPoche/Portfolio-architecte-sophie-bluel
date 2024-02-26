export const categoriesConstructor = (categories) => {
  const filtersUnorderedList = document.createElement("ul");
  filtersUnorderedList.setAttribute("id", "filters_list");
  const defaultFilter = document.createElement("li");
  defaultFilter.classList.add("filter_item");
  defaultFilter.setAttribute("data-category", "all");
  defaultFilter.classList.add("filter_item_active");
  defaultFilter.innerHTML = "Tous";
  filtersUnorderedList.appendChild(defaultFilter);
  categories.forEach((filter) => {
    const filterDiv = constructFilter(filter);
    filtersUnorderedList.appendChild(filterDiv);
  });
  return filtersUnorderedList;
};
