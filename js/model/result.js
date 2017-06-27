import renderElement from '../lib/render';
import WinResultView from '../view/WinResultView';
import Welcome from '../model/Welcome';
import App from '../main';
import LoseResultView from '../view/LoseResultView';
import {sortStat} from '../lib/utils';
import {statistics} from '../data';

class WinResult {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new WinResultView(this.state);
  }

  findPercent(latestResult) {
    const sortedStatistics = sortStat(statistics);

    sortedStatistics.map((result, index) => {
      if (result === latestResult &&
        statistics.length > 1) {
        if ((index + 1) / sortedStatistics.length === 1) {
          this.state.percent = 0;
        } else {
          this.state.percent = Math.round(100 - ((index + 1) / sortedStatistics.length * 100));
        }
      } else if (result === latestResult &&
        index === 0) {
        this.state.percent = 100;
      }
    });
  }
  init() {
    if (!this.state.playerAnswers) {

      this.view = new WinResultView(this.state);
      renderElement(this.view);

    } else {
      const moves = this.state.scoresForAnswer.toString().replace(/,/gi, ``);

      this.state.latestResult = {
        time: this.state.totalTime,
        answers: this.state.playerAnswers,
        moves
      };

      statistics.push(this.state.latestResult);


      this.findPercent(this.state.latestResult);

      App.showStats(this.state.scoresForAnswer);
      renderElement(this.view);


    }
    this.view.replay = () => {
      clearInterval(this.state.timer);
      this.view.state.scoresForAnswer = [];
      App.destroy();
      App.showWelcome();

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

      this.view.init();

    };
  }
}

export {WinResult, LoseResult};

