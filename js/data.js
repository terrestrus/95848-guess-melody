const initialState = Object.freeze({
  numberOfQuestions: 10,
  totalTime: 0,
  playerLives: 3,
  playerAnswers: 0,
  currentIndex: 0,

  games: [
    {
      gameType: `guessSong`,
      songToGuess: {
        title: `Пелагея`,
        path: `../music/song1.mp3`,
        isAnswer: true
      },
      answerVariants: new Set([
        `Пелагея`,
        `Краснознаменная дивизия имени моей бабушки`,
        `Lorde`
      ]),
    },
    {
      gameType: `guessGenre`,
      songs: [
        {
          title: `song1`,
          path: `../music/song1.mp3`,
          isAnswer: true
        },
        {
          title: `song2`,
          path: `../music/song2.mp3`,
          isAnswer: false
        },
        {
          title: `song3`,
          path: `../music/song3.mp3`,
          isAnswer: false
        },
        {
          title: `song4`,
          path: `../music/song4.mp3`,
          isAnswer: true
        },
      ]
    },
    {
      gameType: `guessSong`,
      songToGuess: {
        title: `1`,
        path: `../music/song1.mp3`,
        isAnswer: true
      },
      answerVariants: new Set([
        `1`,
        `2`,
        `3`
      ]),
    },
    {
      gameType: `guessGenre`,
      songs: [
        {
          title: `song1`,
          path: `../music/song1.mp3`,
          isAnswer: true
        },
        {
          title: `song2`,
          path: `../music/song2.mp3`,
          isAnswer: false
        },
        {
          title: `song3`,
          path: `../music/song3.mp3`,
          isAnswer: false
        },
        {
          title: `song4`,
          path: `../music/song4.mp3`,
          isAnswer: true
        },
      ]
    },
    {
      gameType: `guessGenre`,
      songs: [
        {
          title: `song1`,
          path: `../music/song1.mp3`,
          isAnswer: true
        },
        {
          title: `song2`,
          path: `../music/song2.mp3`,
          isAnswer: false
        },
        {
          title: `song3`,
          path: `../music/song3.mp3`,
          isAnswer: false
        },
        {
          title: `song4`,
          path: `../music/song4.mp3`,
          isAnswer: true
        },
      ]
    },
    {
      gameType: `guessGenre`,
      songs: [
        {
          title: `song1`,
          path: `../music/song1.mp3`,
          isAnswer: true
        },
        {
          title: `song2`,
          path: `../music/song2.mp3`,
          isAnswer: false
        },
        {
          title: `song3`,
          path: `../music/song3.mp3`,
          isAnswer: false
        },
        {
          title: `song4`,
          path: `../music/song4.mp3`,
          isAnswer: true
        },
      ]
    },
    {
      gameType: `guessSong`,
      songToGuess: {
        title: `3`,
        path: `../music/song1.mp3`,
        isAnswer: true
      },
      answerVariants: new Set([
        `3`,
        `2`,
        `1`
      ]),
    },
    {
      gameType: `guessSong`,
      songToGuess: {
        title: `qw`,
        path: `../music/song1.mp3`,
        isAnswer: true
      },
      answerVariants: new Set([
        `qw`,
        `qw`,
        `3r`
      ]),
    },
    {
      gameType: `guessSong`,
      songToGuess: {
        title: `q`,
        path: `../music/song1.mp3`,
        isAnswer: true
      },
      answerVariants: new Set([
        `q`,
        `w`,
        `e`
      ]),
    },
    {
      gameType: `guessSong`,
      songToGuess: {
        title: `s`,
        path: `../music/song1.mp3`,
        isAnswer: true
      },
      answerVariants: new Set([
        `s`,
        `a`,
        `f`
      ]),
    },
  ],
  decQuestions() {
    if (this.numberOfQuestions > 1 &&
        this.currentIndex < 9) {
      this.numberOfQuestions--;
      this.currentIndex++;
    }
  },
  incFail() {
    if (this.playerLives > 0) {
      this.playerLives--;
    }
  }

});


const finalResults = Object.freeze({
  winResult: {
    winTitle: ``,
    totalMinutes: 2,
    percents: 80,
    guessedSongs: 4,
  },

  loseResult: {
    loseTitle: ``,
  }
});

const statistics = [
  {time: 20, answers: 10},
  {time: 32, answers: 10},
  {time: 44, answers: 10},
  {time: 20, answers: 8},
  {time: 50, answers: 7}
];

export {initialState, finalResults, statistics};
