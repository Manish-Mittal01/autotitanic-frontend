const preventMinus = (e) => {
  if (e.code === "Minus" || e.code === "NumpadSubtract") {
    e.preventDefault();
  }
};

export default preventMinus;
