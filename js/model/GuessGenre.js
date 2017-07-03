import renderElement from '../lib/Render';
import GamePresenter, {timePassed} from '../model/GamePresenter';
import player from '../view/PlayerView';
import {checkAnswer, checkLives, setRightAnswer} from '../lib/Utils';
import GuessGenreView from '../view/GuessGenreView';
import initializePlayer from '../lib/Player';
import '../lib/Time-format';
import initializeCountdown from '../lib/Timer';
import {initialState} from '../Data';


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


    playerWrappers.forEach((wrapper, index) => {
      wrapper.appendChild(player.cloneNode(true));
      initializePlayer(wrapper, `${this.data[this.state.currentIndex].answers[index].src}`);
    });

    const players = Array.from(this.view.element.querySelectorAll(`audio`));
    const stopAllPlayersExceptOne = (playerIndex) => {
      players.forEach((audioPlayer, index) => {
        if (index !== playerIndex) {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
        }
      });
    };

    const playerControls = Array.from(this.view.element.querySelectorAll(`.player-control`));
    playerControls.forEach((el, index) => {
      el.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        stopAllPlayersExceptOne(index);
      });
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

      const answersArray = [];

      this.data[this.state.currentIndex].answers.forEach((song, index) => {
        const answerCheckboxChecked = (song.genre === this.data[this.state.currentIndex].genre &&
        checkboxes[index].checked);
        const wrongCheckboxNotChecked = (song.genre !== this.data[this.state.currentIndex].genre &&
        !checkboxes[index].checked);

        const rightCheckboxes = (answerCheckboxChecked || wrongCheckboxNotChecked);

        answersArray.push(rightCheckboxes);

      });


      if (!checkAnswer(answersArray) && checkLives(this.state.playerLives)) {
        this.state.incFail();
      } else {
        setRightAnswer(timePassed, this.state);
      }
      this.state.decQuestions();

      checkboxes.forEach((box) => {
        const changeBtnState = () => {
          resultBtn.disabled = !box.checked;
        };
        box.removeEventListener(`click`, changeBtnState);
      });
      playerControls.forEach((el) => {
        el.removeEventListener(`click`, stopAllPlayersExceptOne);
      });


      this.view = new GamePresenter(this.data, this.model, this.state);
      this.view.init();


    };


  }


}


export default GuessGenre;
