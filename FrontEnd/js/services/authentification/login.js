import { callApi } from "../api/utils/callApi.js";

export class ErrorHandlerConnexion extends Error {
  constructor(message) {
    super(message);
    this.name = "ErrorHandlerConnexion";
  }
}

export const login = async (email, password) => {
  const url = "http://localhost:5678/api/users/login";
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
      localStorage.setItem("token", response.token);
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
