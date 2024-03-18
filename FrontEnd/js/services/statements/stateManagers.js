import { deleteWork } from "../api/routes/deleteHandler.js";
import { getCategories } from "../api/routes/getCategories.js";
import { getWorks } from "../api/routes/getWorks.js";

/**
 * ### Global State Manager
 * ------------------------------------------------------------
 * Objet représentant l'état de l'application. Accessible via les fonctions de récupération et de modification.
 * ------------------------------------------------------------
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
   * @type {FormData} newWork
   * @property {number} category La catégorie du produit
   * @property {string} title Le titre du produit
   * @property {File} image L'image du produit
   */
  newWork: new FormData(),
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

function getCategoriesStatesById(id) {
  return states.categories.find((category) => category.id == id);
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
  await deleteWork(id);
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

function addWorkStates(work) {
  //recherche de la catégorie
  const category = getCategoriesStatesById(work.categoryId);
  //construction de l'objet
  const newWork = {
    id: work.id,
    title: work.title,
    imageUrl: work.imageUrl,
    categoryId: work.categoryId,
    userId: work.userId,
    category: category,
  };

  states.works.push(newWork);
}

// New Work Statement

function setNewWorkStates(key, value) {
  if (states.newWork.has(key)) {
    states.newWork.delete(key);
    states.newWork.append(key, value);
  } else {
    states.newWork.append(key, value);
  }
}

/**
 * @description Récupère les données du nouveau travail à ajouter.
 * @returns formData
 */
function getNewWorkStates() {
  return states.newWork;
}

function newWorkHasValidData() {
  const newWork = getNewWorkStates();
  let point = 0;
  if (newWork.has("title")) {
    point++;
  }
  if (newWork.has("category")) {
    point++;
  }
  if (newWork.has("image")) {
    point++;
  }
  if (
    newWork.get("title") === "" ||
    newWork.get("category") === "empty" ||
    newWork.get("image") === ""
  ) {
    return false;
  }
  if (point === 3) {
    return true;
  } else {
    return false;
  }
}
function resetNewWorkStates() {
  states.newWork = new FormData();
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
  getCategoriesStatesById,
  getWorksStates,
  getWorksStatesByCategory,
  fetchAllWorks,
  addWorkStates,
  deleteWorkStatesById,
  setStepModal,
  getStepModal,
  setNewWorkStates,
  getNewWorkStates,
  newWorkHasValidData,
  resetNewWorkStates,
};
