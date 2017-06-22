import renderElement from '../lib/render';
import player from '../view/PlayerView';
import initializePlayer from '../lib/player';
import '../lib/time-format';
import initializeCountdown from '../lib/timer';
import '../lib/animate.js';
import GuessSongView from '../view/GuessSongView';
import {initialState} from '../data';
import GamePresenter from '../model/GamePresenter';
import {rightAnswer} from '../lib/utils';

class GuessSong {
  constructor(state = initialState) {
    this.state = Object.assign({}, state);
    this.view = new GuessSongView(this.state);
  }


  init() {
    renderElement(this.view);

    const wrapper = this.view.element.querySelector(`.player-wrapper`);
    wrapper.appendChild(player);
    initializePlayer(wrapper, this.state.games[this.state.currentIndex].songToGuess.path, true);

    initializeCountdown(this.view.element, this.state);

    this.view.makeDecision = (evt) => {

      if (evt.target.value === this.state.games[this.state.currentIndex].songToGuess.title) {
        rightAnswer(window.timePassed, this.state);
      } else {
        this.state.incFail();
      }
      this.state.decQuestions();
      this.view = new GamePresenter(this.state);
      this.view.init();
    };
  }

}

export default GuessSong;
