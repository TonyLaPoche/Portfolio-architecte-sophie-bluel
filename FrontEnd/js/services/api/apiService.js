/**
 * Effectue une requête à l'API.
 * @param {String} url - URL de l'API.
 * @param {Object} options - Options de la requête HTTP.
 * @returns Les données retournées par l'API.
 */
export const callApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Une erreur est survenue lors de l'appel à l'API");
  }
};

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
