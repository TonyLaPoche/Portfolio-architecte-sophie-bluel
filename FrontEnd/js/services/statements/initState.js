import { getCategoriesStates, getWorksStates } from "./stateManagers.js";

export const initState = async () => {
  return {
    works: await getWorksStates(),
    categories: await getCategoriesStates(),
  };
};
