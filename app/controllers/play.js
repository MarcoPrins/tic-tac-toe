import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayController extends Controller {
  @tracked players = ['x', 'o'];
  @tracked gameNumber = 1;
  @tracked scores = this.createScores();

  @action
  onGameOver(winner) {
    winner !== null ?
      alert(`Player ${winner} has won!`) :
      alert("It's a draw! Play again!");

    this.updateScore(winner);
    this.gameNumber++;
    this.players = this.players.reverse();
  }

  updateScore(winner) {
    this.scores = {
      ...this.scores,
      [winner]: this.scores[winner] + 1
    }
  }

  createScores() {
    let object = {};
    this.players.map((player) => { object[player] = 0 })
    return object;
  }
}
