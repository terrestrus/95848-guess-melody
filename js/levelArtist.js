import levelGenre from '../js/levelGenre';
import renderElement from '../js/render';
import play from '../js/play';
import initializePlayer from '../js/player';
import '../js/time-format';
import initializeCountdown from '../js/timer';
import '../js/animate.js';
import {initialState} from '../js/data';
import GuessSongView from '../js/view/GuessSongView';
import {countdown} from '../js/utils';
import getAnswer from '../js/levelGenre';

const guessSong = (state) => {
  const guesssong = new GuessSongView(state);

  const wrapper = guesssong.element.querySelector(`.player-wrapper`);
  wrapper.appendChild(play);
  initializePlayer(wrapper, guesssong.state.games[0].songToGuess.path, true);
  guesssong.state.totalTime = countdown(120);
  initializeCountdown(guesssong.element);

  guesssong.makeDecision = (evt) => {
    guesssong.state.games.map((answer) => {
      if (answer.gameType === `guessSong`) {
        if (evt.target.value === answer.songToGuess.title) {
          guesssong.state.playerAnswers++;
        } else {
          guesssong.state.incFail();
        }
        guesssong.state.decQuestions();
        renderElement(getAnswer(guesssong.state));
      }
    });
  };

  return guesssong.element;
};

export default guessSong;
