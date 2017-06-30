import renderElement from '../lib/render';
import WelcomeView from '../view/WelcomeView';
import App from '../main';


class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    renderElement(this.view);
    this.view.onStart = () => {
      App.showGame();
    };
  }

}

export default Welcome;
