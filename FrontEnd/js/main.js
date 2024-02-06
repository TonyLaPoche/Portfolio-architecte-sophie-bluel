import { displayFilters } from "./services/displayModels/displayFilters.js";
import { getWorks } from "./services/api/routes/getWorks.js";
import { loginHandler } from "./services/authentification/handler/loginHandler.js";
import { loginHandlerNav } from "./services/handlers/loginHandlerNav.js";

/**
 * ## ROUTER
 * ------------------------------------------------------------
 * Cette classe permet de gérer les routes de l'application.
 * Elle permet de charger une route, de naviguer vers une autre route
 * et de récupérer la route actuelle.
 * Elle utilise l'API History Web pour gérer la navigation.
 * @param {Array} routes - Liste des routes de l'application.
 * @param {string} routes.path - Chemin de la route.
 * @param {function} routes.callback - Fonction de callback appelée lorsque la route est atteinte.
 * @returns {RouterCustom} - Une instance de RouterCustom.
 * @throws {Error} - Lève une erreur si la route n'est pas trouvée.
 * @example
 * const routes = [
 *  { path: "/", callback: () => null, },
 *  { path: "/login.html", callback: () => null, },
 * ];
 * const router = new RouterCustom(routes);
 * router.loadRoute("/login.html");
 * router.navigateTo("/");
 * const currentRoute = router.getCurrentRoute();
 * console.log(currentRoute);
 * // Output: { path: "/", callback: ƒ }
 */
class RouterCustom {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  _getCurrentURL() {
    const path = window.location.pathname;
    return path;
  }
  _matchUrlToRoute(urlSegs) {
    const matchedRoute = this.routes.find((route) => route.path === urlSegs[0]);
    return matchedRoute;
  }
  _loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split("/FrontEnd");
    const pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : "";
    this.loadRoute(...pathSegs);
  }
  loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrlToRoute(urlSegs);
    if (!matchedRoute) {
      throw new Error("Route not found");
    }
    matchedRoute.callback();
  }
  navigateTo(path) {
    window.history.pushState({}, "", path);
    this.loadRoute(path);
  }
  getCurrentRoute() {
    const path = this._getCurrentURL().split("/FrontEnd");
    return this._matchUrlToRoute([path[1]]);
  }
}
/**
 * ## ROUTES
 * ------------------------------------------------------------
 * Routes de l'application.
 * Chaque route est associée à une fonction de callback.
 * La fonction de callback est appelée lorsque la route est atteinte.
 * @type {Array} - Liste des routes de l'application.
 * @example
 * const routes = [
 * { path: "/", callback: () => null, },
 * { path: "/login.html", callback: () => null, },
 * ];
 */
const routes = [
  {
    path: "/index.html",
    callback: () => window.location.replace("/FrontEnd/"),
  },
  {
    path: "/",
    callback: () => null,
  },
  {
    path: "/login.html",
    callback: () => null,
  },
];

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
  const router = new RouterCustom(routes);
  const currentRoute = router.getCurrentRoute();
  if (
    (currentRoute && currentRoute.path === "/") ||
    currentRoute.path === "/index.html"
  ) {
    loginHandlerNav();
    await displayFilters();
    await getWorks();
  } else if (currentRoute && currentRoute.path === "/login.html") {
    loginHandler();
  }
};

document.addEventListener("DOMContentLoaded", init);
