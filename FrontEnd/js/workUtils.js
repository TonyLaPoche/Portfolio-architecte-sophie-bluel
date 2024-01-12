/**
 * Affiche les travaux dans la galerie à l'id gallery.
 * @param {Array} works - Tableau des travaux à afficher.
 */
export const displayWorks = (works) => {
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
export const constructWork = (work) => {
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
