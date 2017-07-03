const checkAnswer = (state) => {
  return state.every((el) => el === true);
};

const checkLives = (lives) => {
  if (lives < 0) {
    throw new Error(`Lives can't be negative`);
  }
  return (lives > 0);
};


const takeStat = (stat, state, time) => {
  stat.push({time, answers: state.playerAnswers});
};

const setRightAnswer = (timePassed, state) => {
  if (timePassed - state.totalTime < 10) {
    state.playerAnswers += 2;
    state.scoresForAnswer.push(2);
  } else {
    state.playerAnswers++;
    state.scoresForAnswer.push(1);
  }
  state.numberOfGuessedMelodies++;
};

const sortStat = (stat) => {
  stat = stat.slice();
  const answersSort = stat.sort((a, b) => a.time - b.time);
  return answersSort.sort((a, b) => b.answers - a.answers);

};

const preloadAudio = (urls = []) => {
  if (!Array.isArray(urls)) {
    throw new Error(`Invalid parameter.`);
  }

  urls = urls.filter((value, index, self) => {
    return value !== `` && self.indexOf(value) === index;
  });
  return Promise.all(urls.map((url) => new Promise((resolve) => {
    const audio = new Audio();
    audio.addEventListener(`canplaythrough`, resolve, false);
    audio.src = url;
  })));

};


export {checkAnswer, checkLives, takeStat, setRightAnswer, sortStat, preloadAudio};
