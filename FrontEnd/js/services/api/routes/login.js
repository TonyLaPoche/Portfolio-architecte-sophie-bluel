import { callApi } from "../utils/callApi.js";

/**
 * Cette erreur est levée lorsqu'une erreur est survenue lors de la connexion.
 */
export class ErrorHandlerConnexion extends Error {
  constructor(message) {
    super(message);
    this.name = "Erreur de connexion";
  }
}

/**
 * @param {*} email adresse email rensignée par l'utilisateur
 * @param {*} password mot de passe renseigné par l'utilisateur
 * @returns  {boolean} true si la connexion est réussie un token est alors intégré au SessionStorage, sinon une erreur est levée.
 */
export const login = async (email, password) => {
  const url = "users/login";
  const body = JSON.stringify({ email, password });
  const options = {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await callApi(url, options);
    if (response.token) {
      sessionStorage.setItem("token", response.token);
    } else if (response.error) {
      throw new Error(response.error);
    }
    return true;
  } catch (error) {
    throw new ErrorHandlerConnexion(
      "Une erreur est survenue lors de la connexion"
    );
  }
};
