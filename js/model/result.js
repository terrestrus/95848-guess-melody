import renderElement from '../lib/render';
import WinResultView from '../view/WinResultView';
import Welcome from '../model/Welcome';
import App from '../main';
import LoseResultView from '../view/LoseResultView';
import {sortStat} from '../lib/utils';


// const getResult = (statistic) => {
//   let rand = Math.floor(Math.random() * statistics.length);
//   let randomRes = statistic[rand];
//   let {answers, time} = randomRes;
//   if (rand === 0) {
//     return {
//       percent: 100,
//       time,
//       answers,
//     };
//   } else {
//     return {
//       percent: 100 - (rand / statistic.length * 100),
//       time,
//       answers
//     };
//   }
// };


class WinResult {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new WinResultView(this.state);
  }


  init() {
    const latestResult = {
      time: this.state.totalTime,
      answers: this.state.playerAnswers
    };

    this.state.statistics.push(latestResult);
    this.state.statistics = sortStat(this.state.statistics);

    this.state.statistics.map((result, index) => {
      if (result === latestResult &&
          this.state.statistics.length > 1) {
        if ((index + 1) / this.state.statistics.length === 1) {
          this.state.percent = 0;
        } else {
          this.state.percent = Math.round(100 - ((index + 1) / this.state.statistics.length * 100));
        }
      } else if (result === latestResult &&
                 index === 0) {
        this.state.percent = 100;
      }
    });

    renderElement(this.view);

    this.view.replay = () => {
      clearInterval(this.state.timer);
      this.view = new Welcome();
      App.showWelcome();
      this.view.init();
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

    this.view.replay = () => {
      clearInterval(this.state.timer);
      this.view = new Welcome();
      App.showWelcome();
      this.view.init();
    };
  }
}

export {WinResult, LoseResult};

