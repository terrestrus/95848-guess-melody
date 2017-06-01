import getElementFromTemplate from '../js/getElementFromTemplate.js';
import levelGenre from '../js/levelGenre.js';
import renderElement from '../js/render.js';

const initialState = Object.freeze({
  timeLeft: {
    minutes: 20,
    seconds: 0,
  },

  answerVariants: [
    `Пелагея`,
    `Краснознаменная дивизия имени моей бабушки`,
    `Lorde`
  ],

});

const nextScreen = () => renderElement(levelGenre);

const artist = (state) => {
  return `<section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    
          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${state.timeLeft.minutes.toString().length < 2 ? `0${state.timeLeft.minutes}` : state.timeLeft.minutes}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${state.timeLeft.seconds.toString().length < 2 ? `0${state.timeLeft.seconds}` : state.timeLeft.seconds}</span>
          </div>
        </svg>
    
        <div class="main-wrap">
          <div class="main-timer"></div>
    
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper"></div>
          <form class="main-list">
           
          </form>
        </div>
      </section>`;
};

const levelArtist = getElementFromTemplate(artist(initialState));

const renderAnswerVars = (vars) => {
  const form = levelArtist.querySelector(`.main-list`);
  vars.map((variant, index) => {
    const answerWrapper = document.createElement(`div`);
    answerWrapper.className = `main-answer-wrapper`;
    answerWrapper.innerHTML = `<input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-1" />
                               <label class="main-answer" for="answer-${index + 1}">
                               <img class="main-answer-preview" src="">
                                 ${variant} 
                               </label>`;

    form.appendChild(answerWrapper);
    const answer = answerWrapper.querySelector(`.main-answer-r`);
    answer.addEventListener(`click`, nextScreen);
  });
};

renderAnswerVars(initialState.answerVariants);


export default levelArtist;
