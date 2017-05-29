const renderElement = (el) => {
  const app = document.querySelector(`section.main`);
  app.innerHTML = ``;
  app.appendChild(el);
};

export default renderElement;
