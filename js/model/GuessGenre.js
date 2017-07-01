import renderElement from '../lib/render';
import GamePresenter, {timePassed} from '../model/GamePresenter';
import player from '../view/PlayerView';
import {checkAnswer, checkLives, setRightAnswer} from '../lib/utils';
import GuessGenreView from '../view/GuessGenreView';
import initializePlayer from '../lib/player';
import '../lib/time-format';
import initializeCountdown from '../lib/timer';
import {initialState} from '../data';


class GuessGenre {
  constructor(data, model, state = initialState) {
    this.state = Object.assign({}, state);
    this.data = data;
    this.model = model;
    this.view = new GuessGenreView(this.data, this.state);
  }


  init() {
    renderElement(this.view);

    const playerWrappers = Array.from(this.view.element.querySelectorAll(`.player-wrapper`));


    playerWrappers.map((wrapper, index) => {
      wrapper.appendChild(player.cloneNode(true));
      initializePlayer(wrapper, `${this.data[this.state.currentIndex].answers[index].src}`);
    });


    initializeCountdown(this.view.element, this.state);


    const checkboxes = this.view.element.querySelectorAll(`input`);
    const resultBtn = this.view.element.querySelector(`.genre-answer-send`);

    checkboxes.forEach((box) => {
      resultBtn.disabled = true;
      const changeBtnState = () => {
        resultBtn.disabled = !box.checked;
      };
      box.addEventListener(`click`, changeBtnState);
    });


    this.view.makeDecision = () => {

      let answersArray = [];

      this.data[this.state.currentIndex].answers.map((song, index) => {
        let rightCheckboxes = ((song.genre === this.data[this.state.currentIndex].genre &&
            checkboxes[index].checked) ||
           (song.genre !== this.data[this.state.currentIndex].genre &&
            !checkboxes[index].checked));
        if (rightCheckboxes) {
          answersArray.push(true);
        } else {
          answersArray.push(false);
        }
      });


      if (!checkAnswer(answersArray)) {
        if (checkLives(this.state.playerLives)) {
          this.state.incFail();
        }
      } else {
        setRightAnswer(timePassed, this.state);
      }
      this.state.decQuestions();
      this.view = new GamePresenter(this.data, this.model, this.state);
      this.view.init();

    };


  }


}


export default GuessGenre;
