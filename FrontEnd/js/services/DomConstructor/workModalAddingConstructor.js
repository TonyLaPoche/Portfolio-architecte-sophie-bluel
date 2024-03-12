import { setStepModalHandler } from "../handlers/StepModalHandler.js";

import {
  getCategoriesStates,
  newWorkHasValidData,
  setNewWorkStates,
} from "../statements/stateManagers.js";

const workModalAddingConstructor = (modalMain) => {
  // Créer le formulaire
  const form = document.createElement("form");
  form.id = "form-add-work";
  form.className = "form-add-work";
  form.method = "post";
  form.enctype = "multipart/form-data";

  // Ajouter la partie "Ajouter une photo" au formulaire
  const addPictureDiv = document.createElement("div");
  addPictureDiv.className = "form-picture";

  //Icone de la photo
  const pictureIcon = document.createElement("i");
  pictureIcon.className = "fa-regular fa-image";
  addPictureDiv.appendChild(pictureIcon);

  //Button englobant le label et l'input permettant de choisir une photo a ajouter au formulaire
  const buttonGlobal = document.createElement("button");
  buttonGlobal.type = "button";
  buttonGlobal.className = "add-picture";

  // Label de l'input permettant de choisir une photo a ajouter au formulaire (visible par l'utilisateur)
  const addPictureLabel = document.createElement("label");
  addPictureLabel.textContent = "+ Ajouter une photo";
  addPictureLabel.setAttribute("for", "file");

  // Input permettant de choisir une photo a ajouter au formulaire (invisible par l'utilisateur)
  const addPictureInput = document.createElement("input");
  addPictureInput.type = "file";
  addPictureInput.id = "file";
  addPictureInput.name = "file";
  addPictureInput.accept = ".jpg, .png";
  addPictureInput.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Ecouteur d'événement sur l'input permettant de choisir une photo a ajouter au formulaire
  addPictureInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    // si le fichier est trop lourd, on alerte l'utilisateur et on vide l'input pour qu'il puisse choisir une autre photo
    if (file.size > 4000000) {
      alert("Fichier trop lourd");
      addPictureInput.value = "";
      return;
    }

    // Crée un element img pour afficher l'image choisie par l'utilisateur
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    img.className = "img-preview";
    img.style.width = "60%";
    img.style.height = "200px";
    img.style.objectFit = "contain";

    // ajoute l'image a formData pour l'envoyer avec le formulaire
    // formData.append("image", file);
    setNewWorkStates("image", file);
    // nettoie la div pour éviter d'afficher plusieurs images
    addPictureDiv.innerHTML = "";
    addPictureDiv.style.padding = "0";
    addPictureDiv.appendChild(img);
  });
  // cache l'input pour que l'utilisateur ne puisse pas le voir
  addPictureInput.style.display = "none";
  addPictureInput.required = true;
  buttonGlobal.appendChild(addPictureLabel);
  buttonGlobal.appendChild(addPictureInput);
  // met en place l'écouteur d'événement sur le bouton englobant le label et l'input et permettant de choisir une photo a ajouter au formulaire
  buttonGlobal.addEventListener("click", (e) => {
    e.preventDefault();
    addPictureInput.click();
  });
  addPictureDiv.appendChild(buttonGlobal);

  // Texte de l'input notifiant l'utilisateur de la taille de l'image et son format ( jpg, jpeg, png) & 4mo max
  const addPictureText = document.createElement("p");
  addPictureText.textContent = "jpg, pbg : 4mo max";
  addPictureDiv.appendChild(addPictureText);
  form.appendChild(addPictureDiv);

  // Ajouter les autres champs au formulaire
  const titleFormGroup = createFormGroup("title", "Titre", "text", true);

  const categoryFormGroup = createFormGroup(
    "category",
    "Catégorie",
    "select",
    true
  );
  form.appendChild(titleFormGroup);
  form.appendChild(categoryFormGroup);

  const button = document.querySelector(".add");

  form.addEventListener("change", (e) => {
    switch (e.target.id) {
      case "title":
        setNewWorkStates("title", e.target.value);
        break;
      case "category":
        setNewWorkStates("category", e.target.value);
        break;
      default:
        break;
    }
    if (newWorkHasValidData()) {
      setStepModalHandler("validation");
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  // Ajouter le formulaire à la div principale
  modalMain.appendChild(form);
};

// Fonction utilitaire pour créer un groupe de formulaire
function createFormGroup(id, label, type, required) {
  const formGroupDiv = document.createElement("div");
  formGroupDiv.className = "form-group";

  const formGroupLabel = document.createElement("label");
  formGroupLabel.setAttribute("for", id);
  formGroupLabel.textContent = label;
  formGroupDiv.appendChild(formGroupLabel);

  const formGroupInput = document.createElement("input");
  formGroupInput.id = id;
  formGroupInput.name = id;
  formGroupInput.type = type;
  formGroupInput.className = "form-control";

  if (required) {
    formGroupInput.required = true;
  }

  if (type === "select") {
    // Pour les sélecteurs, ajoutez les options
    const select = document.createElement("select");
    select.id = id;
    select.name = id;
    select.required = true;
    select.className = "form-control";

    const categoriesDTO = getCategoriesStates();

    const optionEmpty = document.createElement("option");
    optionEmpty.value = "empty";
    optionEmpty.textContent = "Veuillez choisir une catégorie";

    select.appendChild(optionEmpty);

    for (let i = 0; i < categoriesDTO.length; i++) {
      const option = document.createElement("option");
      option.value = categoriesDTO[i].id;
      option.textContent = categoriesDTO[i].name;
      select.appendChild(option);
    }
    formGroupDiv.appendChild(select);
  } else {
    formGroupDiv.appendChild(formGroupInput);
  }

  return formGroupDiv;
}

export default workModalAddingConstructor;
