import { deleteWorkById } from "../api/routes/deleteWorkById.js";
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
   * ## Liste des travaux.
   * Initialement vide, mais remplie par les appels API.
   * @type {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; } }[]}
   *
   * ### Méthode d'accès aux travaux :
   * @example
   * getWorksStates() // retourne tous les travaux
   * getWorksStatesByCategory("all") // retourne tous les travaux
   * getWorksStatesByCategory("params") // retourne les travaux de la catégorie passée en paramètre
   * deleteWorkStatesById(1) // supprime le travail ayant l'identifiant 1
   * addWorkStates({ id: 1, title: "title", imageUrl: "url", categoryId: 1, userId: 1 }) // ajoute un travail à la liste des travaux
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

/**
 * @description Récupère les catégories via un appel API.
 * @returns {{ id: number; name: string; }[]} categories
 */
async function fetchAllCategories() {
  const awaitCategories = await getCategories();
  states.categories = awaitCategories;
  return states.categories;
}

/**
 * @description Récupère les catégories
 * @returns {{ id: number; name: string; }[]} categories
 */
function getCategoriesStates() {
  if (states.categories.length === 0) {
    return fetchAllCategories();
  }
  return states.categories;
}

/**
 * @description Récupère une catégorie en fonction de son identifiant.
 * @param {number | string} id
 * @returns {{ id: number; name: string; }} category
 */
function getCategoriesStatesById(id) {
  return states.categories.find((category) => category.id == id);
}

/* WORKS Statement */

/**
 * @description Récupère les travaux via un appel API.
 * @returns {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; };}[]} works
 */
async function fetchAllWorks() {
  // produit un appel API pour récupérer les travaux
  const data = await getWorks();
  states.works = data;
  return states.works;
}

/**
 * @description Récupère les travaux
 * @returns {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; };}[]} works
 */
function getWorksStates() {
  if (states.works.length === 0) {
    return fetchAllWorks();
  }
  return states.works;
}

/**
 * @description Récupère les travaux en fonction de la catégorie
 * @param {string} category  nom de la catégorie utilisé pour filtrer les travaux
 * @returns  {{ id: number; title: string; imageUrl: string; categoryId: number; userId: number; category: { id: number; name: string; };}[]} worksfiltered
 */
function getWorksStatesByCategory(category) {
  if (category === "all") {
    return states.works;
  }
  let worksfiltered = states.works.filter(
    (work) => work.category.name === category
  );
  return worksfiltered;
}

/**
 * @description Supprime un élément de la base de données.
 * @param {number | string} id
 * @returns {Promise<void>}
 */
async function deleteElementFromBDD(id) {
  await deleteWorkById(id);
}

/**
 * @description Supprime un travail de l'état global.
 * @param {number | string} id - Identifiant du travail à supprimer.
 * @returns {void}
 */
function deleteWorkStatesById(id) {
  const elementToDelete = states.works.find((work) => work.id == id);
  const newState = states.works.filter((work) => work !== elementToDelete);
  states.works = newState;
  document.querySelectorAll(`[data-id="works-${id}"]`).forEach((el) => {
    el.remove();
  });
  deleteElementFromBDD(id);
}

/**
 * @description Ajoute un travail à l'état global.
 * @param {{ "id": number, "title": "string", "imageUrl": "string", "categoryId": "string", "userId": number }} work  - Objet représentant un travail récupéré via l'API.
 * @returns {void}
 */
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

/**
 * @description Modifie les données du nouveau travail à ajouter.
 * @param {string} key
 * @param {string | number | File} value
 */
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

/**
 * @description Vérifie si les données du nouveau travail sont valides et complètes.
 * @returns {boolean} true si les données du nouveau travail sont valides, sinon false.
 */
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

  return point === 3;
}

/**
 * @description Réinitialise les données du nouveau travail.
 * @return {void}
 */
function resetNewWorkStates() {
  states.newWork = new FormData();
}

/* Modal Step Statement */

/**
 * @description Modifie l'étape du processus de modal.
 * @param {string} step
 * @returns {void}
 */
function setStepModal(step) {
  states.stepModal = step;
}

/**
 * @description Récupère l'étape courant du processus de modal.
 * @returns {string} stepModal
 */
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
