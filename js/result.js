import renderElement from '../js/render';
import {statistics} from '../js/data';
import WinResultView from '../js/view/WinResultView';
import Welcome from '../js/welcome';
import App from '../js/main';

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
      this.view = new Welcome();
      App.showWelcome();
      this.view.init();
    };
  }


}


const lose = (state) => {
  return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы проиграли</h2>
      <div class="main-stat">Ничего, вам повезет в следующий раз</div>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
};

export {WinResult, lose};

