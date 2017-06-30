import Welcome from '../js/model/Welcome';
import {WinResult, LoseResult} from '../js/model/Result';
import GamePresenter from '../js/model/GamePresenter';
import {sortStat} from '../js/lib/utils';
import Model from '../js/model/Model';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stat`,
  LOSE: `you-lose`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class Application {
  constructor() {

    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-wbcouextsi.now.sh/guess-melody/questions`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/:evgeniy95848`;
      }

    }();

    this.model.load()
      .then((data) => {
        this.setup(data);
      })
      .then(() => this.changeController(getControllerIDFromHash(location.hash)))
      .catch(() => {
        throw new Error(`Can't download files from server`);
      });


    this.routes = {
      [ControllerID.WELCOME]: new Welcome(),
      [ControllerID.GAME]: new GamePresenter(),
      [ControllerID.STATS]: WinResult,
      [ControllerID.LOSE]: new LoseResult()
    };
  }
  setup(data) {
    this.routes = {
      [ControllerID.WELCOME]: new Welcome(),
      [ControllerID.GAME]: new GamePresenter(data, this.model),
      [ControllerID.STATS]: WinResult,
      [ControllerID.LOSE]: new LoseResult()
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

      this.model.getStat()
        .then((data) => {
          const resultSum = thisResult.split(``).reduce((prev, curr) => {
            return +prev + +curr;
          });

          const sortedStatistics = sortStat(data);

          sortedStatistics.map((result, index) => {
            if (result.answers === resultSum) {
              state = sortedStatistics[index];
              if ((index + 1) / sortedStatistics.length === 1) {
                state.percent = 0;
              } else {
                state.percent = Math.round(100 - ((index + 1) / sortedStatistics.length * 100));

              }

              const Controller = this.routes[ControllerID.STATS];
              new Controller(state, this.model).init();

            }
          });
        });
    } else {
      this.routes[route].init();
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
