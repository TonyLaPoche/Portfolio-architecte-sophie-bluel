import { getCategoriesStates, getWorksStates } from "./stateManagers.js";

/**
 * Cette fonction initialise les états initiaux de l'application.
 */
export const initState = async () => {
  return {
    works: await getWorksStates(),
    categories: await getCategoriesStates(),
  };
};
