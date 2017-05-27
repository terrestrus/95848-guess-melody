import getElementFromTemplate from '../js/getElementFromTemplate';
import levelArtist from '../js/levelArtist.js';
import render from '../js/render.js';


const welcome = getElementFromTemplate(`<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>`);

const mainPlay = welcome.querySelector(`.main-play`);
mainPlay.addEventListener(`click`, (e) => {
  render(levelArtist);
});

export default welcome;

