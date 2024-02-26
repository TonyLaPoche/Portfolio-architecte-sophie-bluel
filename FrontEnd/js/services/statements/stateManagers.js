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

function deleteWorkStatesById(id) {
  deleteWork(id); // Supprime l'oeuvre de la base de données
  states.works = states.works.filter((work) => work.id !== id);
}

export {
  fetchAllCategories,
  getCategoriesStates,
  getWorksStates,
  getWorksStatesByCategory,
  fetchAllWorks,
  deleteWorkStatesById,
};
