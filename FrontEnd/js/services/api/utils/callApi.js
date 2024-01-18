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
