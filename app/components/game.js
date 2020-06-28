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
    const curentBoard = this.board;
    const rotatedBoard = this.rotatedBoard(this.board);

    return [curentBoard, rotatedBoard].some((board) => {
      return this.detectHorizontalRows(board, token) ||
             this.detectDiagonalRow(board, token);
    })
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
