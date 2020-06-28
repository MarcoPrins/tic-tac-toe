import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const flipBoard = (board) => {
  let reversedBoard = board.map(arr => arr.slice()).reverse();

  return reversedBoard[0].map((column, index) => (
    reversedBoard.map(row => row[index])
  ))
};

export default class BoardComponent extends Component {
  @action
  attemptMove(row, column) {
    if (this.args.board[row][column] === null) {
      this.applyMove(row, column);
    }
    else {
      alert('This block is occupied');
    }
  }

  applyMove(row, column) {
    const newBoard = this.args.board.map(arr => arr.slice());
    newBoard[row][column] = this.args.activePlayerToken;
    this.args.updateBoard(newBoard);
  }
}
