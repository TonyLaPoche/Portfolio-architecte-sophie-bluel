import { callApi } from "../utils/callApi.js";

/**
 * @description Supprime un travail par son identifiant.
 * @param {number} id
 * @returns {Promise} Une promesse contenant la réponse de la requête.
 */
export const deleteWorkById = async (id) => {
  const url = `works/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = await callApi(url, options);

  return data;
};
