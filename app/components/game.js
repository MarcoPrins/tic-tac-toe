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
  @tracked moves = 0;
  @tracked board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  @action
  updateBoard(newBoard) {
    this.board = newBoard;
    this.checkForGameEnd();
    this.incrementMoves();
  }

  gameOver(winnerToken) {
    winnerToken !== null ?
      alert(`Player ${winnerToken} has won!`) :
      alert("It's a draw! Play again!");
    this.args.refresh();
  }

  incrementMoves() {
    this.moves = this.moves + 1;
  }

  checkForGameEnd() {
    const token = this.activePlayerToken;
    if (this.didWin(token)) this.gameOver(token);
    if (this.didDraw(token)) this.gameOver(null);
  }

  didDraw() {
    return this.moves === 8;
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
    return playerTokens[this.moves % playerTokens.length];
  }
}
