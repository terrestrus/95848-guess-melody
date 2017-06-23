

const checkAnswer = (state) => {
  return state.every((el) => el === true);
};

const checkLives = (lives) => {
  if (lives < 0) {
    throw new Error(`Lives can't be negative`);
  }
  return (lives > 0) ? true : false;
};

const countdown = (time) => {

  let intervalId = setInterval(() => {
    if (time < 120) {
      time++;
      return time;
    } else {
      return clearInterval(intervalId);
    }
  }, 1000);

  return intervalId;
};

const stopCountdown = (countdow) => {
  clearInterval(countdow);
};

const takeStat = (stat, state, time) => {
  stat.push({time, answers: state.playerAnswers});
};

const rightAnswer = (timePassed, state) => {
  if (timePassed - state.totalTime < 10) {
    state.playerAnswers += 2;
  } else {
    state.playerAnswers++;
  }
  state.numberOfGuessedMelodies++;
};

const sortStat = (stat) => {
  stat = stat.slice();
  const answersSort = stat.sort((a, b) => a.time - b.time);
  return answersSort.sort((a, b) => b.answers - a.answers);

};


export {checkAnswer, checkLives, countdown, stopCountdown, takeStat, rightAnswer, sortStat};