import Welcome from './model/Welcome';
import {WinResult, LoseResult} from './model/Result';
import GamePresenter from './model/GamePresenter';
import {statistics} from '../js/data';
import {sortStat} from '../js/lib/utils';
const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stat`,
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
    if (route.startsWith(`stat=`)) {

      let state;
      const thisResult = location.hash.slice(6);
      this.showStats(thisResult);
      const sortedStatistics = sortStat(statistics);
      sortedStatistics.map((result, index) => {
        if (result.moves === thisResult) {
          state = sortedStatistics[index];
          if ((index + 1) / sortedStatistics.length === 1) {
            state.percent = 0;
          } else {
            state.percent = Math.round(100 - ((index + 1) / sortedStatistics.length * 100));
          }

          const Controller = this.routes[ControllerID.STATS];
          new Controller(state).init();

        }
      });

    } else {
      const Controller = this.routes[route];
      new Controller().init();
    }

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

  showStats(state) {
    if (state) {
      let scores = state.toString().replace(/,/gi, ``);
      location.hash = ControllerID.STATS + `=${scores}`;
    } else {
      location.hash = ControllerID.STATS;
    }
  }

  showLose() {
    location.hash = ControllerID.LOSE;
  }


}

const app = new Application();
app.init();

export default app;
