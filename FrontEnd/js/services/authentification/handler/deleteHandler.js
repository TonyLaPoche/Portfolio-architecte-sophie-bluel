import { callApi } from "../../api/utils/callApi.js";

export const deleteWork = async (id) => {
  const url = `http://localhost:5678/api/works/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = await fetch(url, options);

  return data;
};
