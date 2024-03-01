import { getCategories } from "../api/routes/getCategories.js";
import { getWorks } from "../api/routes/getWorks.js";

const states = {
  // Gestionnaire d'états
  categories: [],
  works: [],
};

/* CATEGORIES */

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

/* WORKS */

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
  // const bodyFormData = new FormData();
  // bodyFormData.append("image", "https://fakeimg.pl/300/");
  // bodyFormData.append("title", "MON TITRE");
  // bodyFormData.append("category", 1);
  // fetch(`http://localhost:5678/api/works`, {
  //   method: "POST",
  //   body: bodyFormData,

  //   headers: {
  //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
}

export {
  fetchAllCategories,
  getCategoriesStates,
  getWorksStates,
  getWorksStatesByCategory,
  fetchAllWorks,
  deleteWorkStatesById,
};
