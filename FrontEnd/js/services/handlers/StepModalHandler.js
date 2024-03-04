import { getStepModal, setStepModal } from "../statements/stateManagers.js";

export const setStepModalHandler = (newState) => {
  setStepModal(newState);
  return getStepModal();
};
