import Welcome from '../js/welcome';
//import renderElement from '../js/render';
//import GuessSong from '../js/levelArtist';
import {WinResult} from '../js/result';
import GamePresenter from '../js/GamePresenter';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `statistics`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class Application {
  constructor() {
    this.routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GAME]: GamePresenter,
      [ControllerID.STATS]: WinResult
    };

    window.addEventListener(`hashchange`, () => {
      this.changeController(getControllerIDFromHash(location.hash));
    });
  }

  changeController(route = ``) {
    const Controller = this.routes[route];
    new Controller().init();
  }

  init() {
    this.changeController(getControllerIDFromHash(location.hash));
  }

  showWelcome() {
    location.hash = ControllerID.WELCOME;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showStats() {
    location.hash = ControllerID.STATS;
  }


}

const app = new Application();
app.init();

export default app;
