import { getWorks } from "./services/api/apiService.js";
import { filterWorks } from "./services/handlers/filterHandler.js";

const init = async () => {
  filterWorks();
  await getWorks();
};

document.addEventListener("DOMContentLoaded", init);
