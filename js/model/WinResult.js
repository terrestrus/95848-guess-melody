import renderElement from '../lib/Render';
import WinResultView from '../view/WinResultView';
import App from '../Main';
import {sortStat} from '../lib/Utils';


class WinResult {
  constructor(state, model) {
    this.state = Object.assign({}, state);
    this.model = model;
    this.view = new WinResultView(this.state);
  }

  findPercent(latest) {

    this.model.getStat()
      .then((data) => {
        const sortedStatistics = sortStat(data);

        sortedStatistics.forEach((result, index) => {
          if (result.answers === latest.answers &&
            result.time === latest.time) {
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
      App.showStats(this.state.scoresForAnswer);
      this.findPercent(this.state.latestResult);
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

