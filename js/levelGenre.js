import getElementFromTemplate from '../js/getElementFromTemplate.js';
import renderElement from '../js/render.js';
import {result} from '../js/result.js';
import play from '../js/play.js';
import initializePlayer from '../js/player.js';
import {initialState} from '../js/data.js';
import {checkAnswer, checkLives} from '../js/utils.js';


const {games} = initialState;

const getGenreTemplate = (data) => {
  return getElementFromTemplate(`<section class="main main--level main--level-genre">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
         ${games[1].songs.map((song, index) =>
            `<div class="genre-answer">
                        <div class="player-wrapper"></div>
                         <input type="checkbox" name="answer" value="answer-1" id="a-${index + 1}">
                         <label class="genre-answer-check" for="a-${index + 1}"></label>
            
            </div>`
         ).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </section>`);
};

const levelGenre = getGenreTemplate(games);

const playerWrappers = Array.from(levelGenre.querySelectorAll(`.player-wrapper`));
playerWrappers.map((wrapper, index) => {
  wrapper.appendChild(play.cloneNode(true));
  initializePlayer(wrapper, `${games[1].songs[index].path}`);
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

const getAnswer = (state) => {
  const newState = Object.assign({}, state);

  let ans = [];
  state.games[1].songs.map((song, index) => {
    if ((song.isAnswer && checkboxes[index].checked) ||
      (!song.isAnswer && !checkboxes[index].checked)) {
      ans.push(true);
    } else {
      ans.push(false);
    }
  });

  newState.games.map((answer) => {
    if (answer.gameType === `guessGenre`) {
      if (!checkAnswer(ans)) {
        if (checkLives(newState.playerLives)) {
          newState.incFail();
          renderElement(result);
        }
      } else {
        newState.playerAnswers++;
        renderElement(result);
      }
    }
  });
};

finalResult.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  getAnswer(initialState);

});


export default levelGenre;
