import { displayModify } from "../../components/Modify/displayModify/displayModify.js";
import { checkLog } from "../utils/checkLog.js";

/**
 * Cette fonction permet de gérer la connexion et la déconnexion de l'utilisateur.
 * Elle intéragie avec le DOM pour afficher les boutons de connexion et de déconnexion.
 * Les méthodes CheckLog() et displayModify() sont utilisées pour vérifier si l'utilisateur est connecté et pour afficher les boutons de modification.
 */
export function handlerNavLogin() {
  const loginElementHtml = document.getElementById("login");
  const hasToken = checkLog();
  if (hasToken) {
    displayModify();
    loginElementHtml.innerHTML = "logout";
    loginElementHtml.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.href = "/login.html";
    });
  } else {
    loginElementHtml.innerHTML = "login";
    loginElementHtml.addEventListener("click", () => {
      window.location.href = "/login.html";
    });
  }
}
