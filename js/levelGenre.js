import renderElement from '../js/render';
import {WinResult} from '../js/result';
import play from '../js/play';
import {checkAnswer, checkLives} from '../js/utils';
import GuessGenreView from '../js/view/GuessGenreView';
import initializePlayer from '../js/player';
import '../js/time-format';
import initializeCountdown from '../js/timer';
import App from '../js/main';


class GuessGenre {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new GuessGenreView(this.state);
  }


  init() {
    renderElement(this.view);

    const playerWrappers = Array.from(this.view.element.querySelectorAll(`.player-wrapper`));
    playerWrappers.map((wrapper, index) => {
      wrapper.appendChild(play.cloneNode(true));
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

      let ans = [];

      this.state.games[this.state.currentIndex].songs.map((song, index) => {
        if ((song.isAnswer && checkboxes[index].checked) ||
              (!song.isAnswer && !checkboxes[index].checked)) {
          ans.push(true);
        } else {
          ans.push(false);
        }
      });


      if (!checkAnswer(ans)) {
        if (checkLives(this.state.playerLives)) {
          this.state.incFail();
        }
      } else {
        this.state.playerAnswers++;
      }
      this.state.decQuestions();
      App.showStats();
      this.view = new WinResult(this.state);
      this.view.init();
      //renderElement(winResult(guessGenre.state));
    };


  }


}


export default GuessGenre;
