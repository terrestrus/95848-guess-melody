import renderElement from '../js/render';
import {statistics} from '../js/data';
import WinResultView from '../js/view/WinResultView';
import welcomeScreen from '../js/welcome';
import {gameTime} from '../js/levelArtist';
import {initialState} from '../js/data';
const sortStat = (stat) => {
  return [...new Set(stat)];
};

const sortedStat = sortStat(statistics);


const winResult = (state) => {
  const result = new WinResultView(state);


  const getResult = (statistic) => {
    let rand = Math.floor(Math.random() * statistics.length);
    let randomRes = statistic[rand];
    let {time, answers} = randomRes;
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

  result.replay = () => {
    renderElement(welcomeScreen(initialState));
  };

  const res = getResult(sortedStat);
  result.state.res = res;
  result.state.totalTime = gameTime;
  return result.element;
};


const lose = (state) => {
  return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы проиграли</h2>
      <div class="main-stat">Ничего, вам повезет в следующий раз</div>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
};

export {winResult, lose};

