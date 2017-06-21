import GuessGenre from '../js/levelGenre';
import GuessSong from '../js/levelArtist';
import {initialState} from '../js/data';
import {LoseResult} from '../js/result';

class GamePresenter {
  constructor(state = initialState) {
    this.state = Object.assign({}, state);
  }

  init() {

    if (this.state.numberOfQuestions === 10) {

      this.state.timer = setInterval(() => {
        if (this.state.totalTime === 120) {
          clearInterval(this.state.timer);
          this.view = new LoseResult();
          this.view.init();
        }
        this.state.totalTime++;
        console.log(this.state.totalTime)
      }, 1000);
    }



    switch (this.state.games[this.state.currentIndex].gameType) {
      case `guessSong`:
        if (this.state.playerLives < 1) {
          clearInterval(this.state.timer);
          this.view = new LoseResult();
          this.view.init();
          break;
        }

        this.view = new GuessSong(this.state);
        this.view.init();
        break;
      case `guessGenre`:
        if (this.state.playerLives < 1) {
          clearInterval(this.state.timer);
          this.view = new LoseResult();
          this.view.init();
          break;
        }

        this.view = new GuessGenre(this.state);
        this.view.init();
        break;
    }

  }


}


export default GamePresenter;
