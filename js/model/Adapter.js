
class Adapter {


  preprocess(data) {
    const preprocessed = {};
    preprocessed.games = [];
    Object.keys(data).forEach((it) => {
      if (it.type === `artist`) {
        preprocessed.games.push({
          gameType: it.type,
          answerVariants: it.answers,
        })

      }

      console.log(preprocessed);
    })

  }

  postprocess(data) {
    return data;
  }
}


export default Adapter;
