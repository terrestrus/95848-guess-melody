import renderElement from '../lib/Render';
import player from '../view/PlayerView';
import initializePlayer from '../lib/Player';
import '../lib/Time-format';
import initializeCountdown from '../lib/Timer';
import '../lib/Animate.js';
import GuessSongView from '../view/GuessSongView';
import {initialState} from '../Data';
import GamePresenter, {timePassed} from '../model/GamePresenter';
import {setRightAnswer} from '../lib/Utils';

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
    initializePlayer(wrapper, this.data[this.state.currentIndex].src, true);
    initializeCountdown(this.view.element, this.state);

    this.view.makeDecision = (evt) => {

      let answerTitle;
      this.data[this.state.currentIndex].answers.map((answer) => {
        if (answer.isCorrect) {
          answerTitle = answer.title;
        }
      });
      if (evt.target.value === answerTitle) {
        setRightAnswer(timePassed, this.state);
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
