const modalHeadConstructor = () => {
  const modalHead = document.createElement("div");
  modalHead.className = "modal-head";

  const divHeadButton = document.createElement("div");
  divHeadButton.className = "head-buttons";
  divHeadButton.style.display = "flex";
  divHeadButton.style.flexDirection = "row-reverse";

  modalHead.appendChild(divHeadButton);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "close";
  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "previous";
  const previousIcon = document.createElement("i");
  previousIcon.className = "fa-solid fa-arrow-left";
  previousButton.appendChild(previousIcon);

  closeButton.appendChild(closeIcon);

  handleClose(closeButton);

  const title = document.createElement("h2");
  title.textContent = "Galerie photo";

  divHeadButton.appendChild(closeButton);
  modalHead.appendChild(title);
};
