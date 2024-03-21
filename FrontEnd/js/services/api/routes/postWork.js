import { callApi } from "../utils/callApi.js";

/**
 * Envoie un nouveau travaux à la BDD.
 * @param {FormData} filtreOptions - Option de filtre pour les travaux (par défaut "all").
 * @returns {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; } }[]} Un tableau de travaux filtrés ou non.
 */
export const postWork = async (newWork) => {
  const option = {
    method: "POST",
    body: newWork,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = await callApi("works", option);

  return data;
};
