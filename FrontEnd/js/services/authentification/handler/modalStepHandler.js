export const modalStepHandler = (button, step) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    stepModalHandler("gallery");
    console.log("stepModal PREVIOUS", getStepModal());
    if (getStepModal() === "gallery") {
      divHeadButton.style.flexDirection = "row-reverse";
      divHeadButton.style.justifyContent = "flex-start";
      divHeadButton.removeChild(previousButton);
      title.textContent = "Galerie photo";
      addButton.textContent = "Ajouter une photo";
      addButton.disabled = false;
    }
    document.querySelector(".modal-main").innerHTML = "";
    workModalConstructor(modalMain, works);
  });
};
