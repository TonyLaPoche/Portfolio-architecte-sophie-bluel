import { ErrorHandlerConnexion, login } from "../login.js";

/**
 * Cette fonction permet de gérer la connexion de l'utilisateur.
 * Si la connexion est réussie, l'utilisateur est redirigé vers la page d'accueil.
 * Sinon, une alerte est affichée.
 */
export const loginHandler = () => {
  document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try {
      const connexion = await login(email, password);
      if (connexion) {
        window.location.href = "./index.html";
      } else {
        alert("Une erreur est survenue lors de la connexion");
      }
    } catch (error) {
      if (error instanceof ErrorHandlerConnexion) {
        alert(error.message + " NAME :" + error.name);
      }
    }
  });
};
