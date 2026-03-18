const KEYS = {
    bestMoves: 'taquin_best_moves',
    bestTime: 'taquin_best_time',
    gamesPlayed: 'taquin_games_played',
};
export function loadScores() {
    const raw = (key) => localStorage.getItem(key);
    return {
        bestMoves: raw(KEYS.bestMoves) !== null ? Number(raw(KEYS.bestMoves)) : null,
        bestTime: raw(KEYS.bestTime) !== null ? Number(raw(KEYS.bestTime)) : null,
        gamesPlayed: Number(raw(KEYS.gamesPlayed) ?? '0'),
    };
}
export function saveResult(moves, timeMs) {
    const current = loadScores();
    const newBestMoves = current.bestMoves === null || moves < current.bestMoves ? moves : current.bestMoves;
    const newBestTime = current.bestTime === null || timeMs < current.bestTime ? timeMs : current.bestTime;
    localStorage.setItem(KEYS.bestMoves, String(newBestMoves));
    localStorage.setItem(KEYS.bestTime, String(newBestTime));
    localStorage.setItem(KEYS.gamesPlayed, String(current.gamesPlayed + 1));
}
//# sourceMappingURL=storage.js.map