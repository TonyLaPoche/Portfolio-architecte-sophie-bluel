import { checkLog } from "../authentification/checkLog.js";
import { displayModify } from "../displayModels/displayModify.js";

/**
 * Cette fonction permet de gérer la connexion et la déconnexion de l'utilisateur.
 */
export function loginHandlerNav() {
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
