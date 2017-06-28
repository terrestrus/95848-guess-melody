import renderElement from '../lib/render';
import player from '../view/PlayerView';
import initializePlayer from '../lib/player';
import '../lib/time-format';
import initializeCountdown from '../lib/timer';
import '../lib/animate.js';
import GuessSongView from '../view/GuessSongView';
import {initialState} from '../data';
import GamePresenter, {timePassed} from '../model/GamePresenter';
import {rightAnswer} from '../lib/utils';

class GuessSong {
  constructor(data, model, state = initialState) {
    this.state = Object.assign({}, state);
    this.data = data;
    this.model = model;
    this.view = new GuessSongView(this.data, this.state);
  }


  init() {
    renderElement(this.view);
    const wrapper = this.view.element.querySelector(`.player-wrapper`);
    wrapper.appendChild(player);
    const newPlayer = initializePlayer(wrapper, this.data[this.state.currentIndex].src, true);
    initializeCountdown(this.view.element, this.state);

    this.view.makeDecision = (evt) => {
      newPlayer();
      let answerTitle;
      this.data[this.state.currentIndex].answers.map((answer) => {
        if (answer.isCorrect) {
          answerTitle = answer.title;
        }
      });
      if (evt.target.value === answerTitle) {

        rightAnswer(timePassed, this.state);

      } else {
        this.state.incFail();

      }


      this.state.decQuestions();
      this.view = new GamePresenter(this.data, this.model, this.state);
      this.view.init();
    };
  }

}

export default GuessSong;
