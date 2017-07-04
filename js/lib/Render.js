const renderElement = (el) => {
  const app = document.querySelector(`section.main`);
  app.innerHTML = ``;
  app.appendChild(el.element);
};

export default renderElement;
