import { callApi } from "../utils/callApi.js";

/**
 * Récupère les travaux depuis l'API
 * @returns {Promise<{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; } }[]>} Un tableau de travaux filtrés ou non.
 */
export const getWorks = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await callApi("works", options);

  return data;
};
