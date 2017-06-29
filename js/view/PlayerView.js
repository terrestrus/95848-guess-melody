import AbstractView from '../view/AbstractView';

class PlayerView extends AbstractView {
  get template() {
    return `<div class="player">
        <audio></audio>
        <button class="player-control" type="button">Play</button>
        <div class="player-track">
        <span class="player-status"></span>
         </div>
      </div>`;
  }

}

const player = new PlayerView().element;
export default player;
