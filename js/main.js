import welcome from '../js/welcome.js';
import render from '../js/render.js';
console.log(welcome);
render(welcome);
// const templates = document.querySelector(`#templates`).content.children;
//
// render(templates.length - 1);
// let position = templates.length - 1;

// document.addEventListener(`keydown`, (e) => {
//
//   if (e.altKey && e.keyCode === 39) {
//
//     if (position === templates.length - 1) {
//       render(position);
//       position = 0;
//     } else {
//       position += 1;
//     }
//       render(position);
//       console.log(position);
//   }
//
//   if (e.altKey && e.keyCode === 37) {
//
//     if (position === 0) {
//       render(position);
//       position = templates.length - 1;
//     } else {
//       position -= 1;
//     }
//       render(position);
//   }
// });


