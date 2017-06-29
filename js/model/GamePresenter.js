import GuessGenre from '../model/GuessGenre';
import GuessSong from '../model/GuessSong';
import {initialState} from '../data';
import {LoseResult, WinResult} from '../model/Result';
import App from '../main';
import {setRightAnswer} from '../lib/utils';

export let timePassed = 0;

const GameType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

class GamePresenter {
  constructor(data, model, state = initialState) {
    this.state = Object.assign({}, state);
    this.data = data;
    this.model = model;
  }

  init() {
    if (this.state.numberOfQuestions === 10) {

      this.state.timer = setInterval(() => {
        if (timePassed === 120) {
          clearInterval(this.state.timer);
          timePassed = 0;
          this.view = new LoseResult(this.state);
          App.showLose();
          this.view.init();
        }
        return timePassed++;
      }, 1000);


    }

    if (this.data) {
      switch (this.data[this.state.currentIndex].type) {
        case GameType.ARTIST:
          if (this.state.playerLives < 1) {
            clearInterval(this.state.timer);
            timePassed = 0;

            App.showLose();
            this.view = new LoseResult(this.state);
            App.showLose();
            this.view.init();
            break;
          }

          if (this.state.numberOfQuestions === 0) {
            setRightAnswer(timePassed, this.state);

            App.showStats(this.state.scoresForAnswer);

            clearInterval(this.state.timer);
            this.state.totalTime = timePassed;

            timePassed = 0;
            this.model.send({
              time: this.state.totalTime,
              answers: this.state.playerAnswers
            });
            this.view = new WinResult(this.state, this.model);
            this.view.init();


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
            App.showLose();
            clearInterval(this.state.timer);
            timePassed = 0;
            this.view = new LoseResult(this.state);
            this.view.init();
            break;
          }

          if (this.state.numberOfQuestions === 0) {
            setRightAnswer(timePassed, this.state);
            App.showStats(this.state.scoresForAnswer);

            clearInterval(this.state.timer);
            this.state.totalTime = timePassed;

            timePassed = 0;
            this.model.send({
              time: this.state.totalTime,
              answers: this.state.playerAnswers
            });
            this.view = new WinResult(this.state, this.model);
            this.view.init();


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
