

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
      clearInterval(intervalId);
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


export {checkAnswer, checkLives, countdown, stopCountdown, takeStat};
