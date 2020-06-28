import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const initialMoves = 0;
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default class GameComponent extends Component {
  @tracked moves = initialMoves;
  @tracked board = initialBoard;

  @action
  updateBoard(newBoard) {
    console.log('whoopie');
    this.board = newBoard;
    if (!this.detectGameOver()) this.incrementMoves();
  }

  incrementMoves() {
    this.moves = this.moves + 1;
  }

  reset() {
    this.moves = initialMoves;
    this.board = initialBoard;
  }

  // Token = null for a draw
  gameOver(token) {
    this.reset();
    this.args.onGameOver(token);
  }

  detectGameOver() {
    const token = this.activePlayerToken;
    if (this.detectVictory(token)) { this.gameOver(token); return true }
    if (this.detectDraw()) { this.gameOver(null); return true }
    return false;
  }

  detectDraw() {
    return this.moves === 8;
  }

  // We only detect victory for the player who just made a move
  detectVictory(token) {
    const board = this.board;
    const rotatedBoard = this.rotatedBoard(this.board);

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

  rotatedBoard(board) {
    let reversedBoard = board.map(arr => arr.slice()).reverse();

    return reversedBoard[0].map((column, index) => (
      reversedBoard.map(row => row[index])
    ))
  }

  get activePlayerToken() {
    const players = this.args.players;
    return players[this.moves % players.length];
  }
}
