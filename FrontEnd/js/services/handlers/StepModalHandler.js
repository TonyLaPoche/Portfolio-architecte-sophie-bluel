import { getStepModal, setStepModal } from "../statements/stateManagers.js";

export const stepModalHandler = (newState) => {
  setStepModal(newState);
  return getStepModal();
};
