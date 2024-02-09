import { construcModify } from "../DomConstructor/modifyConstructor.js";

export const displayModify = () => {
  const modifyCible = document.querySelector("#options");
  const { svgElement, buttonElement } = construcModify();
  modifyCible.appendChild(svgElement);
  modifyCible.appendChild(buttonElement);
};
