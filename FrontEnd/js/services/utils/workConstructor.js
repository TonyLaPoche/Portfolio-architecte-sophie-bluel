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
