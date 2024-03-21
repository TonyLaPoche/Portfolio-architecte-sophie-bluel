import { handlerLoginForm } from "./services/authentification/handlerLoginForm/handlerLoginForm.js";
import { handlerNavLogin } from "./services/authentification/handlerNavLogin/handlerNavLogin.js";
import { displayFilters } from "./services/components/Filters/displayFilters/displayFilters.js";
import { initState } from "./services/statements/initState.js";

/**
 * ## INITIALISATION
 * ------------------------------------------------------------
 * Cette fonction initialise le javascript de l'application.
 * Elle est appelée lorsque le DOM est chargé.
 *
 * Une variable constante de pathname est créée via windows location afin de gérer les routes.
 * Et de déterminer si l'utilisateur est connecté ou non afin de savoir ou il se situe.
 *
 * Si l'utilisateur est sur la page d'accueil, on vérifie si l'utilisateur est connecté. via handlerNavLogin()
 * On initialise les filtres et les travaux via initState() qui renvoie un objet avec les travaux et les catégories.
 * Et l'on affiche les filtres via displayFilters(categories) qui affichera également les travaux nativement sur le filtres 'all'.
 *
 * Si l'utilisateur est sur la page de connexion, on vérifie si l'utilisateur est connecté via handlerLoginForm()
 *
 * ------------------------------------------------------------
 *
 */
const init = async () => {
  const { pathname } = window.location;
  if (pathname === "/" || pathname === "/index.html") {
    // Vérifie si l'utilisateur est connecté
    handlerNavLogin();
    // initialise les filtres et les travaux
    const { categories } = await initState();
    displayFilters(categories);
  } else if (pathname === "/login.html") {
    handlerLoginForm();
  }
};

document.addEventListener("DOMContentLoaded", init);
