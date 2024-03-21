import { callApi } from "../utils/callApi.js";

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
