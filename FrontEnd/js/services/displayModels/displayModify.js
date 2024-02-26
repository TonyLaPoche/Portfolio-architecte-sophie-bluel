import { modifyConstructor } from "../DomConstructor/modifyConstructor.js";

export const displayModify = () => {
  const modifyCible = document.querySelector("#options");
  const { svgElement, buttonElement } = modifyConstructor();
  modifyCible.appendChild(svgElement);
  modifyCible.appendChild(buttonElement);
};
