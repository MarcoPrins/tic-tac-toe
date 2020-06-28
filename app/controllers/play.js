import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayController extends Controller {
  @tracked players = ['x', 'o'];
  @tracked gameNumber = 1;

  @action
  onGameOver(winner) {
    winner !== null ?
      alert(`Player ${winner} has won!`) :
      alert("It's a draw! Play again!");

    this.gameNumber++;
    this.players = this.players.reverse();
  }
}
