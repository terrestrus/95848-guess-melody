import getElementFromTemplate from '../js/getElementFromTemplate.js';
import render from '../js/render.js';
import {result, resultLose} from '../js/result.js';

const levelGenre = getElementFromTemplate(`<section class="main main--level main--level-genre">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>`);

const finalResult = levelGenre.querySelector(`.genre-answer-send`);
const checkboxes = levelGenre.querySelectorAll(`input`);
const form = levelGenre.querySelector(`.genre`);


checkboxes.forEach((box) => {
  finalResult.disabled = true;
  box.addEventListener(`click`, () => {
    if (box.checked === true) {
      finalResult.disabled = false;
    } else {
      finalResult.disabled = true;
    }
  });
});


finalResult.addEventListener(`click`, (e) => {
  let rand = Math.floor(Math.random() * 2);
  if (rand < 1) {
    render(result);
  } else {
    render(resultLose);
  }
});


export default levelGenre;
