import renderElement from '../js/render';
import WelcomeView from '../js/view/WelcomeView';
import GuessSongView from '../js/view/GuessSongView';
import {initialState} from '../js/data';
import guessSong from '../js/levelArtist';

const welcomeScreen = () => {
  const welcome = new WelcomeView();

  welcome.onStart = () => {
    renderElement(guessSong(initialState));
  };
  return welcome.element;
};

export default welcomeScreen;
