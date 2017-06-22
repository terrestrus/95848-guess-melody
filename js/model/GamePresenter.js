import GuessGenre from '../model/GuessGenre';
import GuessSong from '../model/GuessSong';
import {initialState} from '../data';
import {LoseResult, WinResult} from '../model/Result';
import App from '../main';

window.timePassed = 0;

class GamePresenter {
  constructor(state = initialState) {
    this.state = Object.assign({}, state);
  }

  init() {
    if (this.state.numberOfQuestions === 10) {

      this.state.timer = setInterval(() => {
        if (window.timePassed === 120) {
          App.showLose();
          clearInterval(this.state.timer);
          window.timePassed = 0;
          this.view = new LoseResult();
          this.view.init();
        }
        return window.timePassed++;
      }, 1000);


    }

    switch (this.state.games[this.state.currentIndex].gameType) {
      case `guessSong`:
        if (this.state.playerLives < 1) {
          clearInterval(this.state.timer);
          window.timePassed = 0;

          App.showLose();
          this.view = new LoseResult();
          this.view.init();
          break;
        }

        if (this.state.numberOfQuestions === 1) {
          App.showStats();
          clearInterval(this.state.timer);
          this.state.totalTime = window.timePassed;
          window.timePassed = 0;
          this.view = new WinResult(this.state);
          this.view.init();
          break;
        }
        this.state.totalTime = window.timePassed;
        this.view = new GuessSong(this.state);
        this.view.init();
        break;
      case `guessGenre`:
        if (this.state.playerLives < 1) {
          App.showLose();

          clearInterval(this.state.timer);
          window.timePassed = 0;
          this.view = new LoseResult();
          this.view.init();
          break;
        }

        if (this.state.numberOfQuestions === 1) {
          App.showStats();
          clearInterval(this.state.timer);
          this.state.totalTime = window.timePassed;
          window.timePassed = 0;
          this.view = new WinResult(this.state);
          this.view.init();
          break;
        }
        this.state.totalTime = window.timePassed;
        this.view = new GuessGenre(this.state);
        this.view.init();

    }

  }


}


export default GamePresenter;
