import renderElement from '../js/render';
import play from '../js/play';
import initializePlayer from '../js/player';
import '../js/time-format';
import initializeCountdown from '../js/timer';
import '../js/animate.js';
import GuessSongView from '../js/view/GuessSongView';
import {initialState} from '../js/data';
import GuessGenre from '../js/levelGenre';



class GuessSong {
  constructor(state = initialState) {
    this.state = Object.assign({}, state);
    this.view = new GuessSongView(this.state);
  }


  init() {
    this.state.timer = setInterval(() => {
      if (this.state.totalTime === 120) {
        clearInterval(this.state.timer);
      }
      this.state.totalTime++;
    }, 1000);


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
      this.view = new GuessGenre(this.state);
      this.view.init();
    };
  }

}

export default GuessSong;
