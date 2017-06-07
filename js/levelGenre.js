import getElementFromTemplate from '../js/getElementFromTemplate.js';
import renderElement from '../js/render.js';
import {result, resultLose} from '../js/result.js';
import play from '../js/play.js';
import initializePlayer from '../js/player.js';
import {genreData} from '../js/data.js';


const getGenreTemplate = (data) => {
  return getElementFromTemplate(`<section class="main main--level main--level-genre">
      <h2 class="title">${data.title}</h2>
      <form class="genre">
         ${genreData.songs.map((song, index) =>
           `<div class="genre-answer">
                        <div class="player-wrapper"></div>
                         <input type="checkbox" name="answer" value="answer-1" id="a-${index + 1}">
                         <label class="genre-answer-check" for="a-${index + 1}"></label>
            
            </div>`).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </section>`);
};

const levelGenre = getGenreTemplate(genreData);


const playerWrappers = Array.from(levelGenre.querySelectorAll(`.player-wrapper`));

playerWrappers.map((wrapper, index) => {
  wrapper.appendChild(play.cloneNode(true));
  initializePlayer(wrapper, `${genreData.songs[index].path}.mp3`);
});


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
