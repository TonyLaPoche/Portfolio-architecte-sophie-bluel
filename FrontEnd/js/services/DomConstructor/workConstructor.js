/**
 * Construit un élément DOM pour un travail.
 * @param {Object} work - Objet représentant un travail.
 * @returns {HTMLDivElement} Un élément DOM représentant le travail.
 */
export const constructWork = (work) => {
  const workDiv = document.createElement("div");
  workDiv.setAttribute("data-id", "works-" + work.id);
  workDiv.classList.add("work");
  workDiv.innerHTML = `
                      <figure data-id="works-${work.id}" aria-label="projet_${work.title}">
                          <img src="${work.imageUrl}" alt="${work.title}" loading="lazy">
                          <figcaption>${work.title}</figcaption>
                      </figure>
                  `;
  return workDiv;
};
