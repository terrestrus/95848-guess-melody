import renderElement from '../js/render';
import play from '../js/play';
import initializePlayer from '../js/player';
import '../js/time-format';
import initializeCountdown from '../js/timer';
import '../js/animate.js';
import GuessSongView from '../js/view/GuessSongView';
import {initialState} from '../js/data';
import GamePresenter from '../js/GamePresenter';


class GuessSong {
  constructor(state = initialState) {
    this.state = Object.assign({}, state);
    this.view = new GuessSongView(this.state);
  }


  init() {
    renderElement(this.view);

    const wrapper = this.view.element.querySelector(`.player-wrapper`);
    wrapper.appendChild(play);
    initializePlayer(wrapper, this.state.games[this.state.currentIndex].songToGuess.path, true);

    initializeCountdown(this.view.element, this.state);

    this.view.makeDecision = (evt) => {

      if (evt.target.value === this.state.games[this.state.currentIndex].songToGuess.title) {
        this.state.playerAnswers++;
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
