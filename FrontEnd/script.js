/**
 * Initialisation de l'application.
 * Cette fonction initialise les filtres et charge les travaux initiaux via une requête api.
 */
const init = async () => {
  filterWorks();
  await getWorks();
};

/**
 * Effectue une requête à l'API.
 * @param {String} url - URL de l'API.
 * @param {Object} options - Options de la requête HTTP.
 * @returns Les données retournées par l'API.
 */
const callApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Une erreur est survenue lors de l'appel à l'API");
  }
};

/**
 * Récupère les travaux depuis l'API et les filtre en fonction de l'option de filtre.
 * @param {String} filtreOptions - Option de filtre pour les travaux (par défaut "all").
 * @returns Un tableau de travaux filtrés ou non.
 */
const getWorks = async (filtreOptions = "all") => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await callApi("http://localhost:5678/api/works", options);

  return filtreOptions === "all"
    ? data
    : data.filter((work) => work.category.name === filtreOptions);
};

/**
 * Affiche les travaux dans la galerie à l'id gallery.
 * @param {Array} works - Tableau des travaux à afficher.
 */
const displayWorks = (works) => {
  const worksCible = document.querySelector("#gallery");
  worksCible.innerHTML = "";
  works.forEach((work) => {
    const workDiv = constructWork(work);
    worksCible.appendChild(workDiv);
  });
};

/**
 * Construit un élément DOM pour un travail.
 * @param {Object} work - Objet représentant un travail.
 * @returns Un élément DOM représentant le travail.
 */
const constructWork = (work) => {
  const workDiv = document.createElement("div");
  workDiv.classList.add("work");
  workDiv.innerHTML = `
                  <figure>
                      <img src="${work.imageUrl}" alt="${work.title}">
                      <figcaption>${work.title}</figcaption>
                  </figure>
              `;
  return workDiv;
};

/**
 * Initialise les écouteurs d'événements pour les filtres.
 * Cette fonction met en place les écouteurs d'événements sur chaque élément de filtre.
 * Elle appelle updateDisplay avec le filtre sélectionné lorsqu'un élément de filtre est cliqué.
 */
const filterWorks = () => {
  const filterItems = document.querySelectorAll("#filters_list .filter_item");

  const updateDisplay = async (filter) => {
    const works = await getWorks(filter);
    displayWorks(works);
  };

  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      filterItems.forEach((item) => {
        item.classList.remove("filter_item_active");
      });

      this.classList.add("filter_item_active");
      const filter = this.getAttribute("data-category");
      updateDisplay(filter);
    });
  });
  updateDisplay("all");
};

window.onload = init;
