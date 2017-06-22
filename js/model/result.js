import renderElement from '../lib/render';
import {statistics} from '../data';
import WinResultView from '../view/WinResultView';
import Welcome from '../model/Welcome';
import App from '../main';
import LoseResultView from '../view/LoseResultView';

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
    this.state.res = getResult(sortedStat);

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

