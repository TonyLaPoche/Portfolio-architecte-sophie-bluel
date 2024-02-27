import { getCategories } from "../api/routes/getCategories.js";
import { getWorks } from "../api/routes/getWorks.js";
import { deleteWork } from "../api/routes/deleteHandler.js";

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

async function deleteElementFromBDD(id) {
  const data = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const response = await data.json();
  console.log(response);
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
