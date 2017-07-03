import renderElement from '../lib/render';
import WinResultView from '../view/WinResultView';
import App from '../main';
import {sortStat} from '../lib/utils';


class WinResult {
  constructor(state, model) {
    this.state = Object.assign({}, state);
    this.model = model;
    this.view = new WinResultView(this.state);
  }

  findPercent(latestResult) {
    const thisResult = location.hash.slice(6);
    App.showStats(thisResult);

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
      this.view = new WinResultView(this.state);
      renderElement(this.view);
    } else {
      this.state.latestResult = {
        time: this.state.totalTime,
        answers: this.state.playerAnswers,
      };

      this.findPercent(this.state.latestResult);

      App.showStats(this.state.scoresForAnswer);

    }
    this.view.replay = () => {
      clearInterval(this.state.timer);
      this.view.state.scoresForAnswer = [];
      App.showWelcome();
      location.reload();

    };
  }

}


export default WinResult;
