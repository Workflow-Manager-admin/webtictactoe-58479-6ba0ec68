import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Player = 'X' | 'O';
type Square = Player | '';

interface Score {
  X: number;
  O: number;
}

/**
 * PUBLIC_INTERFACE
 * Minimalistic Tic Tac Toe component with instant win detection, score tracking, and reset.
 * Light-themed, responsive design using provided color palette.
 */
@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TicTacToeComponent {
  board: Square[] = Array(9).fill('');
  currentPlayer: Player = 'X';
  winner: Player | null = null;
  draw: boolean = false;
  score: Score = { X: 0, O: 0 };

  // Winning line indices
  private readonly lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  /**
   * PUBLIC_INTERFACE
   * Handles a player clicking on a cell.
   * @param idx Board index
   */
  handleMove(idx: number) {
    if (this.board[idx] || this.winner || this.draw) {
      return;
    }
    this.board[idx] = this.currentPlayer;
    this.checkGameState();
    // Only switch if still playing
    if (!this.winner && !this.draw) {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Resets the board and state for a new game. Keeps the score.
   */
  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = this.nextStarter();
    this.winner = null;
    this.draw = false;
  }

  /**
   * Returns the marker for the next starting player.
   * Alternates each round for fairness.
   */
  private nextStarter(): Player {
    // Alternate: winner starts; on draw swap starter
    if (this.winner) return this.winner;
    if (this.draw) return this.currentPlayer === 'X' ? 'O' : 'X';
    return this.currentPlayer;
  }

  /**
   * Checks for game over conditions and updates winner/draw.
   */
  private checkGameState() {
    for (const [a, b, c] of this.lines) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winner = this.board[a] as Player;
        this.score[this.winner]++;
        return;
      }
    }
    if (this.board.every(cell => cell)) {
      this.draw = true;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Gets the board sign for accessibility.
   * @param idx The board index.
   */
  getAriaLabel(idx: number): string {
    return this.board[idx]
      ? `Square ${idx + 1} ${this.board[idx]}`
      : `Square ${idx + 1}, empty`;
  }

}
