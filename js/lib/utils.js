

const checkAnswer = (state) => {
  return state.every((el) => el === true);
};

const checkLives = (lives) => {
  if (lives < 0) {
    throw new Error(`Lives can't be negative`);
  }
  return (lives > 0) ? true : false;
};


const takeStat = (stat, state, time) => {
  stat.push({time, answers: state.playerAnswers});
};

const rightAnswer = (timePassed, state) => {
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


export {checkAnswer, checkLives, takeStat, rightAnswer, sortStat};
