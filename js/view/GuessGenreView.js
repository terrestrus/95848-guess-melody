import AbstractView from '../view/AbstractView';

class GuessGenreView extends AbstractView {
  constructor(state) {
    super();
    this.state = Object.assign({}, state);
  }

  get template() {
    const songs = this.state.games[1].songs;

    return `<section class="main main--level main--level-genre">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
         ${songs.map((song, index) =>
      `<div class="genre-answer">
                        <div class="player-wrapper"></div>
                         <input type="checkbox" name="answer" value="answer-1" id="a-${index + 1}">
                         <label class="genre-answer-check" for="a-${index + 1}"></label>
            
            </div>`
    )}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
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
