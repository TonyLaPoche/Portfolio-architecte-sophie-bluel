import { displayFilters } from "./services/displayModels/displayFilters.js";
import { getWorks } from "./services/api/routes/getWorks.js";
import { loginHandler } from "./services/authentification/handler/loginHandler.js";

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
    console.log(this.routes);
    const matchedRoute = this.routes.find((route) => route.path === urlSegs[0]);
    return matchedRoute;
  }
  _loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split("/FrontEnd");
    const pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : "";
    console.log(pathnameSplit);
    this.loadRoute(...pathSegs);
  }
  loadRoute(...urlSegs) {
    console.log(urlSegs);
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
    console.log(path[1]);
    return this._matchUrlToRoute([path[1]]);
  }
}

const routes = [
  { path: "/", callback: () => console.log("Home page") },
  {
    path: "/login.html",
    callback: () => console.log("login page"),
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
  if (currentRoute && currentRoute.path === "/") {
    await displayFilters();
    await getWorks();
  } else if (currentRoute && currentRoute.path === "/login.html") {
    loginHandler();
  }
};

document.addEventListener("DOMContentLoaded", init);
