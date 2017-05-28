const templates = document.querySelector(`#templates`).content.children;
const app = document.querySelector(`section.main`);

let position = templates.length - 1;

const renderElement = (num) => {
  app.innerHTML = ``;
  if (num > templates.length - 1) {
    position = 0;
    num = 0;
  } else if (num < 0) {
    position = templates.length - 1;
    num = templates.length - 1;
  }
  let element = templates[num].cloneNode(true);
  app.appendChild(element);
};

renderElement(templates.length - 1);

document.addEventListener(`keydown`, function switchScreen(evt) {

  if (evt.altKey && evt.keyCode === 39) {
    renderElement(position);
    position += 1;
  }

  if (evt.altKey && evt.keyCode === 37) {
    renderElement(position);
    position -= 1;
  }
});


