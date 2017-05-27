const render = (el) => {
  const app = document.querySelector(`section.main`);
  app.innerHTML = ``;
  // let e = templates[num].cloneNode(true);
  app.appendChild(el);
};

export default render;
