export type GameStatus = 'idle' | 'playing' | 'paused' | 'won';

export interface Tile {
  value: number;   // 1–15 (0 = celda vacía)
  position: number; // índice 0–15 en el tablero actual
}

export interface GameState {
  tiles: Tile[];
  moves: number;
  status: GameStatus;
  startTime: number | null;
  elapsedTime: number;
}

export interface BestScores {
  bestMoves: number | null;
  bestTime: number | null;
  gamesPlayed: number;
}
