import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const playerTokens = ["x", "o"];

export default class GameComponent extends Component {
  @tracked activePlayer = 0;
  @tracked board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  @action
  enterMove(row, column) {
    if (this.board[row][column] === null) {
      this.registerMove(row, column);
    }
    else {
      alert('This block is occupied');
    }
  }

  registerMove(row, column) {
    this.updateBoard(row, column);
    this.checkVictoryCondition();
    this.toggleActivePlayer();
  }

  updateBoard(row, column) {
    const newBoard = this.board.map(arr => arr.slice());
    newBoard[row][column] = this.activePlayerToken;
    this.board = newBoard;
  }

  toggleActivePlayer() {
    this.activePlayer = (this.activePlayer + 1) % playerTokens.length;
  }

  checkVictoryCondition() {
    // TODO
  }

  get activePlayerToken() {
    return playerTokens[this.activePlayer];
  }
}
