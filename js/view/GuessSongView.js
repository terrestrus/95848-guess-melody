import AbstractView from '../view/AbstractView';

class GuessSongView extends AbstractView {
  constructor(data, state) {
    super();
    this.state = Object.assign({}, state);
    this.data = data;
  }

  get template() {
    const answerVariants = this.data[this.state.currentIndex].answers;

    return `<section class="main main--level main--level-artist">
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
    
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper"></div>
          <form class="main-list">
            ${[...answerVariants].map((variant, index) => {
              return `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${variant.title}" />
            <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="${variant.image.url}">
                 ${variant.title}
            </label>
            </div>`;
            })}
          </form>
        </div>
      </section>`;
  }

  makeDecision() {}

  bind() {
    const answers = Array.from(this._element.querySelectorAll(`.main-answer-r`));
    const getAnswer = (evt) => {
      evt.preventDefault();
      this.makeDecision(evt);
    };
    answers.map((answer) => {
      answer.addEventListener(`click`, (evt) => getAnswer(evt));
    });
  }


}

export default GuessSongView;
