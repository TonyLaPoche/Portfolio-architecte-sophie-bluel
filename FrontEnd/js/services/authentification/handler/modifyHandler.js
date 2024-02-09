export const handleModify = (button) => {
  let hasOpen = false;
  const setHasOpen = (value) => {
    hasOpen = value;
  };
  button.addEventListener("click", () => {
    setHasOpen(!hasOpen);
    console.log("modal is : ", hasOpen);
    if (hasOpen) {
      console.log("open modal");
    } else {
      console.log("close modal");
    }
  });
};
