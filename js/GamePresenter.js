import GuessGenreView from '../js/view/GuessGenreView';
import GuessSongView from '../js/view/GuessSongView';

class GamePresenter {
  constructor(state, View) {
    this.state = Object.assign({}, state);
  }

  init() {

    switch (this.state.games[this.state.currentIndex].gameType) {
      case `guessSong`:
        this.view = new GuessSongView(this.state);
        break;
      case `guessGenre`:
        this.view = new GuessGenreView(this.state);
        break;
    }

  }


}


export default GamePresenter;
