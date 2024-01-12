import { getWorks } from "./apiService.js";
import { filterWorks } from "./filterHandler.js";

const init = async () => {
  filterWorks();
  await getWorks();
};

document.addEventListener("DOMContentLoaded", init);
