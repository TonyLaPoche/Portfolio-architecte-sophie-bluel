import { callApi } from "../utils/callApi.js";

/**
 * Récupère les travaux depuis l'API et les filtre en fonction de l'option de filtre.
 * @param {String} filtreOptions - Option de filtre pour les travaux (par défaut "all").
 * @returns Un tableau de travaux filtrés ou non.
 */
export const getWorks = async (filtreOptions = "all") => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await callApi("http://localhost:5678/api/works", options);

  return filtreOptions === "all"
    ? data
    : data.filter((work) => work.category.name === filtreOptions);
};
