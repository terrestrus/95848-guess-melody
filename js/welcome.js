import renderElement from '../js/render';
import WelcomeView from '../js/view/WelcomeView';
import {initialState} from '../js/data';
import guessSong from '../js/levelArtist';

const welcomeScreen = () => {

  const welcome = new WelcomeView(initialState);

  welcome.onStart = () => {
    renderElement(guessSong(welcome.state));
  };
  return welcome.element;
};

export default welcomeScreen;
