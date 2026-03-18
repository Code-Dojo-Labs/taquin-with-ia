import { createSolvedBoard, shuffle, moveTile, isSolved } from './board.js';
export function createInitialState() {
    return {
        tiles: shuffle(createSolvedBoard()),
        moves: 0,
        status: 'idle',
        startTime: null,
        elapsedTime: 0,
    };
}
export function applyMove(state, tileIndex) {
    const next = moveTile(state.tiles, tileIndex);
    if (!next)
        return state;
    const moves = state.moves + 1;
    const status = isSolved(next) ? 'won' : 'playing';
    return { ...state, tiles: next, moves, status };
}
//# sourceMappingURL=game.js.map