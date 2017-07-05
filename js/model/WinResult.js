import renderElement from '../lib/Render';
import WinResultView from '../view/WinResultView';
import App from '../Main';

export let latestResult;

class WinResult {
  constructor(state, model) {
    this.state = Object.assign({}, state);
    this.model = model;
    this.view = new WinResultView(this.state);
  }

  init() {
    if (!this.state.playerAnswers) {
      this.view = new WinResultView(this.state);
      renderElement(this.view);
    } else {
      latestResult = {
        time: this.state.totalTime,
        answers: this.state.playerAnswers,
      };
      App.showStats(this.state.scoresForAnswer);

    }

    this.view.replay = () => {
      clearInterval(this.state.timer);
      this.view.state.scoresForAnswer = [];
      App.showWelcome();
      location.reload();

    };
  }

}


export default WinResult;

