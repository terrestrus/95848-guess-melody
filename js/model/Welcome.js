import renderElement from '../lib/Render';
import WelcomeView from '../view/WelcomeView';
import App from '../Main';


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
