import renderElement from '../js/render';
import {result} from '../js/result';
import play from '../js/play';
import initializePlayer from '../js/player';
import {initialState} from '../js/data';
import {checkAnswer, checkLives} from '../js/utils';
import GuessGenreView from '../js/view/GuessGenreView';

//
// const playerWrappers = Array.from(levelGenre.querySelectorAll(`.player-wrapper`));
// playerWrappers.map((wrapper, index) => {
//   wrapper.appendChild(play.cloneNode(true));
//   initializePlayer(wrapper, `${games[1].songs[index].path}`);
// });

const getAnswer = (state) => {
  const guessGenre = new GuessGenreView(state);

  const checkboxes = guessGenre.element.querySelectorAll(`input`);
  const resultBtn = guessGenre.element.querySelector(`.genre-answer-send`);

  checkboxes.forEach((box) => {
    resultBtn.disabled = true;
    const changeBtnState = () => {
      resultBtn.disabled = !box.checked;
    };
    box.addEventListener(`click`, changeBtnState);
  });


  guessGenre.makeDecision = () => {
    guessGenre.state.games.map((answer) => {
      if (answer.gameType === `guessGenre`) {
        let ans = [];

        answer.songs.map((song, index) => {
          if ((song.isAnswer && checkboxes[index].checked) ||
            (!song.isAnswer && !checkboxes[index].checked)) {
            ans.push(true);
          } else {
            ans.push(false);
          }
        });


        if (!checkAnswer(ans)) {
          if (checkLives(guessGenre.state.playerLives)) {
            guessGenre.state.incFail();
          }
        } else {
          guessGenre.state.playerAnswers++;
        }
        guessGenre.state.decQuestions();
        console.log(guessGenre.state);
        renderElement(result);
      }
    });
  };

  return guessGenre.element;

};

export default getAnswer;
