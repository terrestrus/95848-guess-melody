import renderElement from '../lib/Render';
import App from '../Main';
import LoseResultView from '../view/LoseResultView';
import Welcome from '../model/Welcome';


class LoseResult {
  constructor(state) {
    this.state = Object.assign({}, state);
    this.view = new LoseResultView();
  }
  init() {
    renderElement(this.view);
    clearInterval(this.state.timer);
    this.view.replay = () => {
      this.view = new Welcome();
      App.showWelcome();
      location.reload();
      this.view.init();

    };
  }
}

export default LoseResult;
