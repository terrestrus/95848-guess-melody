import Welcome from '../js/model/Welcome';
import WinResult from '../js/model/WinResult';
import LoseResult from '../js/model/LoseResult';
import GamePresenter from '../js/model/GamePresenter';
import {sortStat} from './lib/Utils';
import Model from '../js/model/Model';
import {GameType} from '../js/model/GamePresenter';
import {preloadAudio} from './lib/Utils';
import Preloader from '../js/view/PreloaderView';
import renderElement from './lib/Render';

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
        const preloader = this.showPreloader();
        const urls = data.reduce((result, current) => {
          switch (current.type) {
            case GameType.ARTIST:
              result.push(current.src);
              break;
            case GameType.GENRE:
              result = result.concat(current.answers.map((answer) => answer.src));
              break;
          }

          return result;
        }, []);

        preloadAudio(urls)
          .then(() => {

            this._setup(data);
            preloader();
          })

          .then(() => this._changeController(getControllerIDFromHash(location.hash)))
          .catch(() => {
            throw new Error(`Can't download files from server`);
          });

      });

    this.routes = {
      [ControllerID.WELCOME]: new Welcome(),
      [ControllerID.GAME]: new GamePresenter(),
      [ControllerID.STATS]: WinResult,
      [ControllerID.LOSE]: new LoseResult()
    };

  }
  _setup(data) {
    this.routes = {
      [ControllerID.WELCOME]: new Welcome(),
      [ControllerID.GAME]: new GamePresenter(data, this.model),
      [ControllerID.STATS]: WinResult,
      [ControllerID.LOSE]: new LoseResult()
    };
    window.addEventListener(`hashchange`, () => {
      this._changeController(getControllerIDFromHash(location.hash));
    });
  }

  _changeController(route = ``) {
    if (route.startsWith(`stat=`)) {
      const preloader = this.showPreloader();
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
              preloader();
              new Controller(state, this.model).init();

            }
          });
        });
    } else {
      this.routes[route].init();
    }
  }

  init() {
    this._changeController(getControllerIDFromHash(location.hash));
  }

  showPreloader() {
    const preloader = new Preloader();
    renderElement(preloader);
    preloader.start();

    return () => preloader.hide();
  }

  showWelcome() {
    location.hash = ControllerID.WELCOME;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showStats(state) {
    if (state) {
      const scores = state.toString().replace(/,/gi, ``);
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
