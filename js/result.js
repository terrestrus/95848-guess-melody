import getElementFromTemplate from '../js/getElementFromTemplate.js';
import render from '../js/render.js';
import welcome from '../js/welcome.js';

const result = getElementFromTemplate(`<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`);

const resultLose = getElementFromTemplate(`<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`);

const replay = result.querySelector(`.main-replay`);
replay.addEventListener(`click`, () => {
    render(welcome);
});

const replayLose = resultLose.querySelector(`.main-replay`);
replayLose.addEventListener(`click`, () => {
  render(welcome);
});

export {result, resultLose};

