import getElementFromTemplate from '../js/getElementFromTemplate.js';
import levelGenre from '../js/levelGenre.js';
import renderElement from '../js/render.js';
import play from '../js/play.js';
import initializePlayer from '../js/player.js';
import '../js/time-format.js';
import initializeCountdown from '../js/timer.js';
import '../js/animate.js';
import {initialState} from '../js/data.js';

const {oneOfThreeGame} = initialState;


const getArtistTemplate = (state) => {
  return getElementFromTemplate(`<section class="main main--level main--level-artist">
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
            ${[...oneOfThreeGame[0].answerVariants].map((variant, index) => {
              return `<div class="main-answer-wrapper">
                <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${variant}" />
                <label class="main-answer" for="answer-${index + 1}">
                <img class="main-answer-preview" src="">
                 ${variant}
                </label>
                 </div>`;
            }).join(``)}
          </form>
        </div>
      </section>`);
};


const levelArtist = getArtistTemplate(oneOfThreeGame);
const answersVars = Array.from(levelArtist.querySelectorAll(`.main-answer-r`));



const makeDecision = (evt, state) => {
  const newState = Object.assign({}, state);

  [...newState.oneOfThreeGame].map((answer) => {
    if (evt.target.value === answer.songToGuess.title) {
      newState.playerAnswers++;

    } else {
      if (newState.playerLives > 0) {
        newState.playerAnswers--;
        newState.playerLives--;
      }
    }
    if (newState.numberOfQuestions > 0) {
      newState.numberOfQuestions--;
    }


  });

  return newState;
};

answersVars.forEach((answer) => answer.addEventListener(`click`, (evt) => {
  makeDecision(evt, initialState);
  renderElement(levelGenre);
}));


const wrapper = levelArtist.querySelector(`.player-wrapper`);
wrapper.appendChild(play);
initializePlayer(wrapper, oneOfThreeGame[0].songToGuess.path, true);
initializeCountdown(levelArtist);


export default levelArtist;
