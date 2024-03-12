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
  /**
   * @type {{ id: number; name: string; }[]}
   * @returns Un tableau d'object de catégories comprenant un identifiant et un nom.
   */
  const data = await callApi("categories", options);
  return data;
};
