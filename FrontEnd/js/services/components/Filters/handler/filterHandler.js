import { getWorksStatesByCategory } from "../../../statements/stateManagers.js";
import { displayWorks } from "../../Works/displayWorks/displayWorks.js";

/**
 * @description Met à jour l'affichage des travaux en fonction du filtre sélectionné.
 * @param {string} categoryName - Nom de la catégorie de travaux à afficher.
 */
const updateDisplay = (categoryName) => {
  const worksData = getWorksStatesByCategory(categoryName);
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
      const category = this.getAttribute("data-category");
      updateDisplay(category);
    });
  });
  updateDisplay("all");
};
