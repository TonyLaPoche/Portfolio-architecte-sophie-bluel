import { ErrorHandlerConnexion, login } from "../login.js";

export const loginHandler = () => {
  document
    .querySelector(".login_form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      try {
        const connexion = await login(email, password);
        if (connexion) {
          window.location.href = "./";
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
