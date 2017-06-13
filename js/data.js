const initialState = Object.freeze({
  numberOfQuestions: 10,
  totalTime: 120000,
  playerLives: 3,
  playerAnswers: 0,
  oneOfThreeGame: [
    {
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
    }
  ],
  allOfGenreGame: [
    {
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
    }
  ]
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
