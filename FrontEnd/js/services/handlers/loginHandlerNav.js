import { checkLog } from "../authentification/checkLog.js";

export function loginHandlerNav() {
  const loginElementHtml = document.getElementById("login");
  if (checkLog()) {
    loginElementHtml.innerHTML = "logout";
    loginElementHtml.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    });
  } else {
    loginElementHtml.innerHTML = "login";
    loginElementHtml.addEventListener("click", () => {
      window.location.href = "/login.html";
    });
  }
}
