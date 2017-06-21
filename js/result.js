import renderElement from '../js/render';
import {statistics} from '../js/data';
import WinResultView from '../js/view/WinResultView';
import Welcome from '../js/welcome';
import App from '../js/main';
import LoseResultView from '../js/view/LoseResultView';

const sortStat = (stat) => {
  return [...new Set(stat)];
};

const sortedStat = sortStat(statistics);


const getResult = (statistic) => {
  let rand = Math.floor(Math.random() * statistics.length);
  let randomRes = statistic[rand];
  let {answers, time} = randomRes;
  if (rand === 0) {
    return {
      percent: 100,
      time,
      answers,
    };
  } else {
    return {
      percent: 100 - (rand / statistic.length * 100),
      time,
      answers
    };
  }
};


class WinResult {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new WinResultView(this.state);
  }


  init() {
    const res = getResult(sortedStat);
    this.state.res = res;

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

