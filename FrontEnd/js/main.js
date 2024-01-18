import { displayFilters } from "./services/displayModels/displayFilters.js";
import { getWorks } from "./services/api/routes/getWorks.js";
/**
 * INITIALISATION
 *
 * Cette fonction initialise le javascript de l'application.
 * Elle est appelée lorsque le DOM est chargé.
 *
 * Elle appelle displayFilters() pour afficher les filtres,
 * puis getWorks() pour récupérer les travaux et les afficher.
 */
const init = async () => {
  await displayFilters();
  await getWorks();
};

document.addEventListener("DOMContentLoaded", init);
