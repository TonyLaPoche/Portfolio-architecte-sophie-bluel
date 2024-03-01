import { displayWorks } from "../displayModels/displayWorks.js";
import { getWorksStatesByCategory } from "../statements/stateManagers.js";

const updateDisplay = (filter) => {
  const worksData = getWorksStatesByCategory(filter);
  displayWorks(worksData);
};
/**
 * Initialise les écouteurs d'événements pour les filtres.
 * Cette fonction met en place les écouteurs d'événements sur chaque élément de filtre.
 * Elle appelle updateDisplay avec le filtre sélectionné lorsqu'un élément de filtre est cliqué.
 */
export const filtersHandlers = () => {
  const filterItems = document.querySelectorAll(".filter_item");

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
