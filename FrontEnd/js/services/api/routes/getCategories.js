import { callApi } from "../utils/callApi.js";

/**
 * Récupère l'ensemble des catégories.
 * @returns {{id: Number, name: String[]}[]} Un tableau d'object de catégories comprenant un identifiant et un nom.
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
