import { getWorks } from "./apiService.js";
import { displayWorks } from "./workUtils.js";

/**
 * Initialise les écouteurs d'événements pour les filtres.
 * Cette fonction met en place les écouteurs d'événements sur chaque élément de filtre.
 * Elle appelle updateDisplay avec le filtre sélectionné lorsqu'un élément de filtre est cliqué.
 */
export const filterWorks = () => {
  const filterItems = document.querySelectorAll("#filters_list .filter_item");

  const updateDisplay = async (filter) => {
    const works = await getWorks(filter);
    displayWorks(works);
  };

  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      filterItems.forEach((item) => {
        item.classList.remove("filter_item_active");
      });

      this.classList.add("filter_item_active");
      const filter = this.getAttribute("data-category");
      updateDisplay(filter);
    });
  });
  updateDisplay("all");
};
