import renderElement from '../lib/render';
import GamePresenter from '../model/GamePresenter';
import player from '../view/PlayerView';
import {checkAnswer, checkLives, rightAnswer} from '../lib/utils';
import GuessGenreView from '../view/GuessGenreView';
import initializePlayer from '../lib/player';
import '../lib/time-format';
import initializeCountdown from '../lib/timer';


class GuessGenre {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new GuessGenreView(this.state);
  }


  init() {
    renderElement(this.view);

    const playerWrappers = Array.from(this.view.element.querySelectorAll(`.player-wrapper`));
    playerWrappers.map((wrapper, index) => {
      wrapper.appendChild(player.cloneNode(true));
      initializePlayer(wrapper, `${this.state.games[this.state.currentIndex].songs[index].path}`);
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

      this.state.games[this.state.currentIndex].songs.map((song, index) => {
        if ((song.isAnswer && checkboxes[index].checked) ||
              (!song.isAnswer && !checkboxes[index].checked)) {
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
        rightAnswer(window.timePassed, this.state);
      }
      this.state.decQuestions();
      this.view = new GamePresenter(this.state);
      this.view.init();

    };


  }


}


export default GuessGenre;
