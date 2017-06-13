import getElementFromTemplate from '../js/getElementFromTemplate.js';
import renderElement from '../js/render.js';
import {result, resultLose} from '../js/result.js';
import play from '../js/play.js';
import initializePlayer from '../js/player.js';
import {initialState} from '../js/data.js';
import {checkAnswer, checkLives, countdown} from '../js/utils.js';

const {allOfGenreGame} = initialState;


const getGenreTemplate = (data) => {
  return getElementFromTemplate(`<section class="main main--level main--level-genre">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
         ${allOfGenreGame[0].songs.map((song, index) =>
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

const levelGenre = getGenreTemplate(allOfGenreGame);

const playerWrappers = Array.from(levelGenre.querySelectorAll(`.player-wrapper`));
playerWrappers.map((wrapper, index) => {
  wrapper.appendChild(play.cloneNode(true));
  initializePlayer(wrapper, `${allOfGenreGame[0].songs[index].path}`);
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


// const takeRandomRes = () => {
//   let rand = Math.floor(Math.random() * 2);
//   return rand < 1 ? renderElement(result) : renderElement(resultLose);
// };

// /////////////////////////////////////////////////////
const userAnswer = (state) => {
  let newState = Object.assign({}, state);
  let answer = [];
  newState.allOfGenreGame.map((tracks) => {
    tracks.songs.map((song, index) => {
      if ((song.isAnswer && checkboxes[index].checked) ||
        (!song.isAnswer && !checkboxes[index].checked)) {
        answer.push(true);

      } else {
        answer.push(false);
      }
    });
  });


  const newLevelGenre = getGenreTemplate(newState.allOfGenreGame);
  const newFinalResult = newLevelGenre.querySelector(`.genre-answer-send`);
  const newCheckboxes = levelGenre.querySelectorAll(`input`);

  newCheckboxes.forEach((box) => {
    newFinalResult.disabled = true;
    const changeBtnState = () => {
      newFinalResult.disabled = !box.checked;
    };
    box.addEventListener(`click`, changeBtnState);

  });

  newFinalResult.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    userAnswer(newState);
  });


  const newPlayerWrappers = Array.from(newLevelGenre.querySelectorAll(`.player-wrapper`));

  newPlayerWrappers.map((wrapper, index) => {
    wrapper.appendChild(play.cloneNode(true));
    initializePlayer(wrapper, `${newState.allOfGenreGame[0].songs[index].path}`);
  });


  if (!checkAnswer(answer)) {
    if (checkLives(newState.playerLives)) {
      newState.playerLives--;
      renderElement(newLevelGenre);
    } else {
      renderElement(result);

    }
  } else {
    newState.playerAnswers++;
    renderElement(newLevelGenre);
  }


};
// ///////////////////////////////////


finalResult.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  userAnswer(initialState);

});
// finalResult.addEventListener(`click`, takeRandomRes);


export default levelGenre;
