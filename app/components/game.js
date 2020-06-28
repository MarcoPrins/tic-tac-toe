import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const playerTokens = ["x", "o"];

const flipBoard = (board) => {
  let reversedBoard = board.map(arr => arr.slice()).reverse();

  return reversedBoard[0].map((column, index) => (
    reversedBoard.map(row => row[index])
  ))
};

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
    this.checkForGameEnd();
    this.toggleActivePlayer();
  }

  // Null for draw
  registerVictory(token) {
    token !== null ?
      alert(`Player ${token} has won!`) :
      alert("It's a draw. Play again");
  }

  updateBoard(row, column) {
    const newBoard = this.board.map(arr => arr.slice());
    newBoard[row][column] = this.activePlayerToken;
    this.board = newBoard;
  }

  toggleActivePlayer() {
    this.activePlayer = (this.activePlayer + 1) % playerTokens.length;
  }

  checkForGameEnd() {
    const token = this.activePlayerToken;
    if (this.didWin(token)) { this.registerVictory(token) }
  }

  didWin(token) {
    const board = this.board;
    const rotatedBoard = flipBoard(this.board);

    const horizontal =   this.detectHorizontalRows(board, token);
    const diagonalUp =   this.detectDiagonalRow(board, token);
    const vertical =     this.detectHorizontalRows(rotatedBoard, token);
    const diagonalDown = this.detectDiagonalRow(rotatedBoard, token);

    return (horizontal || vertical || diagonalUp || diagonalDown);
  }

  detectHorizontalRows(board, token) {
    return board.some(row => row.every(entry => entry === token));
  }

  detectDiagonalRow(board, token) {
    return [board[0][0], board[1][1], board[2][2]].every(entry => entry === token);
  }

  get activePlayerToken() {
    return playerTokens[this.activePlayer];
  }
}
