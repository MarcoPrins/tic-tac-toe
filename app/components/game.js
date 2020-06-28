import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const players = ["x", "o"];
const initialMoves = 0;
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default class GameComponent extends Component {
  @tracked moves = initialMoves;
  @tracked board = initialBoard;

  init() {
    console.log('hello');
  }

  @action
  updateBoard(newBoard) {
    this.board = newBoard;
    this.detectGameOver();
    this.incrementMoves();
  }

  // Pass null for draw
  gameOver(winner) {
    winner !== null ?
      alert(`Player ${winner} has won!`) :
      alert("It's a draw! Play again!");
  }

  incrementMoves() {
    this.moves = this.moves + 1;
  }

  detectGameOver() {
    const token = this.activePlayerToken;
    if (this.detectVictory(token)) this.gameOver(token);
    if (this.detectDraw(token)) this.gameOver(null);
  }

  detectDraw() {
    return this.moves === 8;
  }

  // We only detect victory for the player who just made a move
  detectVictory(token) {
    const board = this.board;
    const rotatedBoard = this.flipBoard(this.board);

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

  flipBoard(board) {
    let reversedBoard = board.map(arr => arr.slice()).reverse();

    return reversedBoard[0].map((column, index) => (
      reversedBoard.map(row => row[index])
    ))
  }

  get activePlayerToken() {
    return players[this.moves % players.length];
  }
}
