import getElementFromTemplate from '../js/getElementFromTemplate.js';
import renderElement from '../js/render.js';
import {result, resultLose} from '../js/result.js';
import play from '../js/play.js';
import '../js/player.js';

const genreData = Object.freeze({
  title: `Выберите инди-рок треки`,
  songs: [
    `song1`,
    `song2`,
    `song3`,
    `song4`,
  ]
});

const genre = (data) => {
  return `<section class="main main--level main--level-genre">
      <h2 class="title">${data.title}</h2>
      <form class="genre">
     
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </section>`;
};

const levelGenre = getElementFromTemplate(genre(genreData));

const genreAnswer = (songs) => {
  const form = levelGenre.querySelector(`.genre`);
  const btn = levelGenre.querySelector(`.genre-answer-send`);

  songs.map((song, index) => {
    const answer = document.createElement(`div`);
    answer.className = `genre-answer`;
    answer.innerHTML = ` <div class="player-wrapper"></div>
                         <input type="checkbox" name="answer" value="answer-1" id="a-${index + 1}">
                         <label class="genre-answer-check" for="a-${index + 1}"></label>`;


    form.insertBefore(answer, btn);
    const wrapper = answer.querySelector(`.player-wrapper`);
    wrapper.appendChild(play);
    window.initializePlayer(wrapper, `../music/${song}.mp3`);
  });
};
genreAnswer(genreData.songs);


const finalResult = levelGenre.querySelector(`.genre-answer-send`);
const checkboxes = levelGenre.querySelectorAll(`input`);

checkboxes.forEach((box) => {
  finalResult.disabled = true;
  const changeBtnState = () => {
    finalResult.disabled = !box.checked;
  };
  box.addEventListener(`click`, changeBtnState);
});

const takeRandomRes = () => {
  let rand = Math.floor(Math.random() * 2);
  return rand < 1 ? renderElement(result) : renderElement(resultLose);
};

finalResult.addEventListener(`click`, takeRandomRes);


export default levelGenre;
