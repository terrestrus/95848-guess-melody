import AbstractView from '../view/AbstractView';

class GuessGenreView extends AbstractView {
  constructor(state) {
    super();
    this.state = Object.assign({}, state);
  }

  get template() {
    const songs = this.state.games[this.state.currentIndex].songs;

    return `
      <section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    
          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins"></span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs"></span>
          </div>
        </svg>
      <div class="main-wrap">
      <div class="main-timer"></div>
      <h2 class="title">Выберите инди-рок треки</h2>
       <form class="genre">
         ${songs.map((song, index) =>
      `<div class="genre-answer">
                        <div class="player-wrapper"></div>
                         <input type="checkbox" name="answer" value="answer-1" id="a-${index + 1}">
                         <label class="genre-answer-check" for="a-${index + 1}"></label>
            
            </div>`).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
      </div>
    </section>`;
  }

  makeDecision() {}

  bind() {
    const answer = this._element.querySelector(`.genre-answer-send`);
    const getAnswer = (evt) => {
      evt.preventDefault();
      this.makeDecision();
    };

    answer.addEventListener(`click`, (evt) => getAnswer(evt));
  }


}

export default GuessGenreView;
