import renderElement from '../lib/render';
import WinResultView from '../view/WinResultView';
import Welcome from '../model/Welcome';
import App from '../main';
import LoseResultView from '../view/LoseResultView';
import {sortStat} from '../lib/utils';


class WinResult {
  constructor(state, model) {
    this.state = Object.assign({}, state);
    this.model = model;
    this.view = new WinResultView(this.state);
  }

  findPercent(latestResult) {


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
            this.state = sortedStatistics[index];
            if ((index + 1) / sortedStatistics.length === 1) {
              this.state.percent = 0;
            } else {
              this.state.percent = Math.round(100 - ((index + 1) / sortedStatistics.length * 100));

            }
          }
        });
      });
  }
  init() {
    if (!this.state.playerAnswers) {

      this.view = new WinResultView(this.state, this.model);

      renderElement(this.view);

    } else {

      this.state.latestResult = {
        time: this.state.totalTime,
        answers: this.state.playerAnswers,

      };

      this.findPercent(this.state.latestResult);

      App.showStats(this.state.scoresForAnswer);
      renderElement(this.view);


    }
    this.view.replay = () => {
      clearInterval(this.state.timer);
      this.view.state.scoresForAnswer = [];
      App.destroy();
      App.showWelcome();
      location.reload();

    };
  }

}

class LoseResult {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new LoseResultView();
  }
  init() {
    renderElement(this.view);
    clearInterval(this.state.timer);
    this.view.replay = () => {
      this.view = new Welcome();
      App.showWelcome();
      App.destroy();
      location.reload();
      this.view.init();

    };
  }
}

export {WinResult, LoseResult};

