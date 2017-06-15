import getElementFromTemplate from '../js/getElementFromTemplate.js';
import renderElement from '../js/render.js';
import welcome from '../js/welcome.js';
import {finalResults} from '../js/data.js';
import {statistics} from '../js/data.js';

const sortStat = (stat) => {
  return [...new Set(stat)];
};

const sortedStat = sortStat(statistics);

const getResult = (statistic) => {
  let rand = Math.floor(Math.random() * statistics.length);
  let answers = statistic[rand].answers;
  if (rand === 0) {
    return {
      percent: 100,
      answers
    };
  } else {
    return {
      percent: 100 - (rand / statistic.length * 100),
      answers
    };
  }
};

const res = getResult(sortedStat);


const winResult = (state) => {
  return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${state.totalMinutes}&nbsp;минуты<br>вы&nbsp;отгадали ${res.answers}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${res.percent}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
};

const result = getElementFromTemplate(winResult(finalResults.winResult));

const lose = (state) => {
  return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Вы проиграли</h2>
      <div class="main-stat">Ничего, вам повезет в следующий раз</div>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
};

const resultLose = getElementFromTemplate(lose(finalResults.loseResult));

const replay = result.querySelector(`.main-replay`);
const startOver = () => renderElement(welcome);
replay.addEventListener(`click`, startOver);

const replayLose = resultLose.querySelector(`.main-replay`);
replayLose.addEventListener(`click`, startOver);

export {result, resultLose};

