const initialState = Object.freeze({
  numberOfQuestions: 10,
  totalTime: 0,
  playerLives: 3,
  playerAnswers: 0,
  currentIndex: 0,
  numberOfGuessedMelodies: 0,
  latestResult: {},
  scoresForAnswer: [],

  decQuestions() {
    if (this.numberOfQuestions > 1 &&
        this.currentIndex < 9) {
      --this.numberOfQuestions;
      ++this.currentIndex;
    }
  },
  incFail() {
    if (this.playerLives > 0) {
      this.playerLives--;
    }
  }

});




export {initialState};
