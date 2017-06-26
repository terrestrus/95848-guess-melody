import Welcome from './model/Welcome';
import {WinResult, LoseResult} from './model/Result';
import GamePresenter from './model/GamePresenter';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `statistics`,
  LOSE: `you-lose`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class Application {
  constructor() {
    this.routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GAME]: GamePresenter,
      [ControllerID.STATS]: WinResult,
      [ControllerID.LOSE]: LoseResult
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

  showLose() {
    location.hash = ControllerID.LOSE;
  }


}

const app = new Application();
app.init();

export default app;
