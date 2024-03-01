import { displayFilters } from "./services/displayModels/displayFilters.js";
import { loginHandler } from "./services/authentification/handler/loginHandler.js";
import { loginHandlerNav } from "./services/handlers/loginHandlerNav.js";

import { initState } from "./services/statements/initState.js";

/**
 * ## INITIALISATION
 * ------------------------------------------------------------
 * Cette fonction initialise le javascript de l'application.
 * Elle est appelée lorsque le DOM est chargé.
 *
 * Une instance de RouterCustom est créée afin de gérer les routes.
 *
 * Elle appelle displayFilters() pour afficher les filtres,
 * puis getWorks() pour récupérer les travaux et les afficher.
 */
const init = async () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    console.log("index.html");
    // Vérifie si l'utilisateur est connecté
    loginHandlerNav();
    // initialise les filtres et les travaux
    const { works, categories } = await initState();
    displayFilters(categories);
  } else if (window.location.pathname === "/login.html") {
    console.log("login.html");
    loginHandler();
  }
};

document.addEventListener("DOMContentLoaded", init);
