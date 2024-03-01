import { callApi } from "../utils/callApi.js";

export const deleteWork = async (id) => {
  const url = `http://localhost:5678/api/works/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = await callApi(url, options);

  return data;
};
