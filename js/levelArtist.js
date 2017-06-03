import getElementFromTemplate from '../js/getElementFromTemplate.js';
import levelGenre from '../js/levelGenre.js';
import renderElement from '../js/render.js';
import play from '../js/play.js';
import '../js/player.js';
import '../js/time-format.js';
import '../js/timer.js';
import '../js/animate.js';

const initialState = Object.freeze({
  mainTitle: `Кто исполняет эту песню?`,
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
            <span class="timer-value-mins"></span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs"></span>
          </div>
        </svg>
    
        <div class="main-wrap">
          <div class="main-timer"></div>
    
          <h2 class="title main-title">${state.mainTitle}</h2>
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

const wrapper = levelArtist.querySelector(`.player-wrapper`);
wrapper.appendChild(play);
window.initializePlayer(wrapper, `../music/song1.mp3`, true);
window.initializeCountdown(levelArtist);


export default levelArtist;
