/**
 *
 * @returns {string} Le token de l'utilisateur si celui-ci est connecté, sinon null.
 */
export const checkLog = () => {
  const token = sessionStorage.getItem("token");
  return token;
};
