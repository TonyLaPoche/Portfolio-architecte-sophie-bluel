import { callApi } from "../utils/callApi.js";

/**
 * Récupère l'ensemble des catégories.
 * @returns  Un tableau d'object de catégories comprenant un identifiant et un nom.
 */
export const getCategories = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await callApi("http://localhost:5678/api/categories", options);
  return data;
};
