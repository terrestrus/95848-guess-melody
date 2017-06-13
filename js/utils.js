

const checkAnswer = (state) => {
  return state.every((el) => el === true);
};

const checkLives = (lives) => {
  if (lives < 0) {
    throw new Error(`Lives can't be negative`);
  }
  return (lives > 0) ? true : false;
};

const countdown = (state) => {
  let intervalId = setInterval(() => {
    if (state.totalTime !== 0) {
      state.totalTime -= 1000;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

export {checkAnswer, checkLives, countdown};
