const initialState = Object.freeze({
  title: `Кто исполняет эту песню?`,
  songToGuess: `../music/song1.mp3`,
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
    `song1`,
    `song2`,
    `song3`,
    `song4`,
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
