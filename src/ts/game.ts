import type { GameState, GameStatus } from './types/game.types.js';
import { createSolvedBoard, shuffle, moveTile, isSolved } from './board.js';

export function createInitialState(): GameState {
  return {
    tiles: shuffle(createSolvedBoard()),
    moves: 0,
    status: 'idle' as GameStatus,
    startTime: null,
    elapsedTime: 0,
  };
}

export function applyMove(state: GameState, tileIndex: number): GameState {
  const next = moveTile(state.tiles, tileIndex);
  if (!next) return state;

  const moves = state.moves + 1;
  const status: GameStatus = isSolved(next) ? 'won' : 'playing';

  return { ...state, tiles: next, moves, status };
}
