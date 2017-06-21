import renderElement from '../js/render';
import WelcomeView from '../js/view/WelcomeView';
import App from '../js/main';
// import {initialState} from '../js/data';
// import guessSong from '../js/levelArtist';

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
