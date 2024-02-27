import { getCategories } from "../api/routes/getCategories.js";
import { getWorks } from "../api/routes/getWorks.js";
import { deleteWork } from "../authentification/handler/deleteHandler.js";

const states = {
  // Gestionnaire d'états
  categories: [],
  works: [],
};

/* CATEGORIES */

async function fetchAllCategories() {
  if (states.categories.length === 0) {
    // Vérifie si les catégories sont déjà chargées
    states.categories = await getCategories();
  }
  return states.categories;
}

function getCategoriesStates() {
  return states.categories;
}

/* WORKS */

async function fetchAllWorks() {
  if (states.works.length === 0) {
    // Vérifie si les travaux sont déjà chargés
    states.works = await getWorks();
  }
  return states.works;
}

function getWorksStates() {
  return states.works;
}

function getWorksStatesByCategory(category) {
  if (category === "all") {
    return states.works;
  }
  let works = states.works.filter((work) => work.category.name === category);
  return works;
}

function deleteElementFromBDD(id) {
  deleteWork(id);
}

function deleteWorkStatesById(id) {
  const elementToDelete = states.works.find((work) => work.id == id);
  const newState = states.works.filter((work) => work !== elementToDelete);
  states.works = newState;
  document.querySelectorAll(`[data-id="works-${id}"]`).forEach((el) => {
    el.remove();
  });
  deleteElementFromBDD(id);
}

export {
  fetchAllCategories,
  getCategoriesStates,
  getWorksStates,
  getWorksStatesByCategory,
  fetchAllWorks,
  deleteWorkStatesById,
};
