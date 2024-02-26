import { callApi } from "../../api/utils/callApi.js";

export const deleteWork = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = await callApi(`http://localhost:5678/api/works/${id}`, options);

  return data;
};
