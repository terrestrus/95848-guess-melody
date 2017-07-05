import GuessGenre from '../model/GuessGenre';
import GuessSong from '../model/GuessSong';
import {initialState} from '../Data';
import LoseResult from '../model/LoseResult';
import WinResult from '../model/WinResult';
import App from '../Main';
import {setRightAnswer} from '../lib/Utils';

export let timePassed = 0;

export const GameType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

class GamePresenter {
  constructor(data, model, state = initialState) {
    this.state = Object.assign({}, state);
    this.data = data;
    this.model = model;
  }

  _playerLose() {
    clearInterval(this.state.timer);
    timePassed = 0;
    this.view = new LoseResult(this.state);
    App.showLose();
    this.view.init();
  }

  _playerWin() {
    this.model.send({
      time: this.state.totalTime,
      answers: this.state.playerAnswers
    })
      .then(() => {
        setRightAnswer(timePassed, this.state);
        clearInterval(this.state.timer);
        this.state.totalTime = timePassed;

        timePassed = 0;

        this.view = new WinResult(this.state, this.model);
        this.view.init();
        App.showStats(this.state.scoresForAnswer);
      })
      .catch(() => {
        throw new Error(`Can't send data to server`);
      });

  }

  init() {
     if (this.state.numberOfQuestions === 10) {

      this.state.timer = setInterval(() => {
        if (timePassed === 120) {
          this._playerLose();
        }
        return timePassed++;
      }, 1000);


    }

    if (this.data) {
      switch (this.data[this.state.currentIndex].type) {
        case GameType.ARTIST:
          if (this.state.playerLives < 1) {
            this._playerLose();
            break;
          }

          if (this.state.numberOfQuestions === 0) {
            this._playerWin();
            break;
          }
          this.state.totalTime = timePassed;
          if (this.state.scoresForAnswer.length > 9) {
            this.state.scoresForAnswer = [];
          }
          this.view = new GuessSong(this.data, this.model, this.state);
          this.view.init();
          break;
        case GameType.GENRE:
          if (this.state.playerLives < 1) {
            this._playerLose();
            break;
          }

          if (this.state.numberOfQuestions === 0) {
            this._playerWin();
            break;
          }
          this.state.totalTime = timePassed;
          if (this.state.scoresForAnswer.length > 9) {
            this.state.scoresForAnswer = [];
          }
          this.view = new GuessGenre(this.data, this.model, this.state);
          this.view.init();

      }

    }
  }


}


export default GamePresenter;
