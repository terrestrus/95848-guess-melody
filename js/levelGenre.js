import renderElement from '../js/render';
import {winResult} from '../js/result';
import play from '../js/play';
import {checkAnswer, checkLives} from '../js/utils';
import GuessGenreView from '../js/view/GuessGenreView';
import {gameTime} from '../js/levelArtist';
import initializePlayer from '../js/player';
import '../js/time-format';
import initializeCountdown from '../js/timer';


const getAnswer = (state) => {
  const guessGenre = new GuessGenreView(state);
  guessGenre.state.totalTime = gameTime;

  const playerWrappers = Array.from(guessGenre.element.querySelectorAll(`.player-wrapper`));
  playerWrappers.map((wrapper, index) => {
    wrapper.appendChild(play.cloneNode(true));
    initializePlayer(wrapper, `${guessGenre.state.games[1].songs[index].path}`);
  });

  initializeCountdown(guessGenre.element);


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
        renderElement(winResult(guessGenre.state));
      }
    });
  };

  return guessGenre.element;

};

export default getAnswer;
