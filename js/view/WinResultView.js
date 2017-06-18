import AbstractView from '../view/AbstractView';

class WinResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${this.state.res.time}&nbsp;минуты<br>вы&nbsp;отгадали ${this.state.res.answers}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.state.res.percent}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  replay() {}

  bind() {
    const replayBtn = this._element.querySelector(`.main-replay`);
    const replayGame = () => {
      this.replay();
    };
    replayBtn.addEventListener(`click`, replayGame);
  }
}

export default WinResultView;
