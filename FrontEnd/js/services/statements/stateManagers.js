import { getCategories } from "../api/routes/getCategories.js";
import { getWorks } from "../api/routes/getWorks.js";

/**
 * @typedef {Object} States - Objet représentant l'état de l'application.
 * @property {{ id: number; name: string; }[]} categories - Liste des catégories. Initialement vide, mais remplie par les appels API.
 * @property {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; } }[]} works - Liste des travaux. Initialement vide, mais remplie par les appels API.
 * @property {number} stepModal - Étape du processus de modal.
 */
const states = {
  /**
   * Liste des catégories. Initialement vide, mais remplie par les appels API.
   * @type {{ id: number; name: string; }[]}
   */
  categories: [],

  /**
   * Liste des travaux. Initialement vide, mais remplie par les appels API.
   * @type {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; } }[]}
   */
  works: [],

  /**
   * Étape du processus de modal.
   * @type {string}
   */
  stepModal: "gallery",

  /**
   * Nouveau travail à ajouter.
   * @type {{ title: string; imageUrl: string; categoryId: string; userId: string; }}
   */
  newWork: {
    title: "",
    imageUrl: "",
    categoryId: "",
    userId: "",
  },
};

/* CATEGORIES Statement */

async function fetchAllCategories() {
  const awaitCategories = await getCategories();
  states.categories = awaitCategories;
  return states.categories;
}

function getCategoriesStates() {
  if (states.categories.length === 0) {
    return fetchAllCategories();
  }
  return states.categories;
}

/* WORKS Statement */

async function fetchAllWorks() {
  const data = await getWorks();
  states.works = data;
  return states.works;
}

function getWorksStates() {
  if (states.works.length === 0) {
    return fetchAllWorks();
  }
  return states.works;
}

function getWorksStatesByCategory(category) {
  if (category === "all") {
    return states.works;
  }
  let worksfiltered = states.works.filter(
    (work) => work.category.name === category
  );
  return worksfiltered;
}

async function deleteElementFromBDD(id) {
  const data = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  console.log("delete");
  const response = await data;
  console.log(response);
}

function deleteWorkStatesById(id) {
  const elementToDelete = states.works.find((work) => work.id == id);
  const newState = states.works.filter((work) => work !== elementToDelete);
  states.works = newState;
  document.querySelectorAll(`[data-id="works-${id}"]`).forEach((el) => {
    el.remove();
  });
  console.log("states AJOUT");
  deleteElementFromBDD(id);
}

// New Work Statement

function setNewWorkStates(key, value) {
  states.newWork[key] = value;
  console.log(states.newWork);
}

function getNewWorkStates() {
  return states.newWork;
}

function newWorkHasValidData() {
  const newWork = getNewWorkStates();
  if (
    newWork.title === "" ||
    newWork.imageUrl === "" ||
    newWork.categoryId === ""
  ) {
    return false;
  }
  return true;
}

function resetNewWorkStates() {
  states.newWork = {
    title: "",
    imageUrl: "",
    categoryId: "",
    userId: "",
  };
}

/* Modal Step Statement */

function setStepModal(step) {
  states.stepModal = step;
}

function getStepModal() {
  return states.stepModal;
}

export {
  fetchAllCategories,
  getCategoriesStates,
  getWorksStates,
  getWorksStatesByCategory,
  fetchAllWorks,
  deleteWorkStatesById,
  setStepModal,
  getStepModal,
  setNewWorkStates,
  getNewWorkStates,
  newWorkHasValidData,
  resetNewWorkStates,
};
