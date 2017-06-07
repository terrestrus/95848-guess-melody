const initialState = Object.freeze({
  title: `Кто исполняет эту песню?`,
  songToGuess: {
    title: `song1`,
    path: `../music/song1.mp3`,
    isAnswer: true
  },
  answerVariants: new Set([
    `Пелагея`,
    `Краснознаменная дивизия имени моей бабушки`,
    `Lorde`
  ]),
});

const genreData = Object.freeze({
  title: `Выберите инди-рок треки`,
  path: `../music/`,
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
});

const finalResults = Object.freeze({
  winResult: {
    winTitle: `Вы настоящий меломан!`,
    totalMinutes: 2,
    percents: 80,
    guessedSongs: 4,
  },

  loseResult: {
    loseTitle: `Вы проиграли`,
  }
});


export {initialState, genreData, finalResults};
