const BOARD_SIZE = 4;
const TOTAL = BOARD_SIZE * BOARD_SIZE;
/** Genera un tablero en orden: 1–15 + celda vacía (0) al final */
export function createSolvedBoard() {
    return Array.from({ length: TOTAL }, (_, i) => ({
        value: i < TOTAL - 1 ? i + 1 : 0,
        position: i,
    }));
}
/** Obtiene el índice de la celda vacía (value === 0) */
export function getEmptyIndex(tiles) {
    return tiles.findIndex((t) => t.value === 0);
}
/** Devuelve los vecinos movibles del hueco */
export function getMovableTiles(emptyIndex) {
    const row = Math.floor(emptyIndex / BOARD_SIZE);
    const col = emptyIndex % BOARD_SIZE;
    const neighbours = [];
    if (row > 0)
        neighbours.push(emptyIndex - BOARD_SIZE); // arriba
    if (row < BOARD_SIZE - 1)
        neighbours.push(emptyIndex + BOARD_SIZE); // abajo
    if (col > 0)
        neighbours.push(emptyIndex - 1); // izquierda
    if (col < BOARD_SIZE - 1)
        neighbours.push(emptyIndex + 1); // derecha
    return neighbours;
}
/** Mueve la ficha en `tileIndex` hacia la celda vacía (si es válido) */
export function moveTile(tiles, tileIndex) {
    const emptyIndex = getEmptyIndex(tiles);
    if (!getMovableTiles(emptyIndex).includes(tileIndex)) {
        return null;
    }
    const next = [...tiles];
    [next[emptyIndex], next[tileIndex]] = [next[tileIndex], next[emptyIndex]];
    return next.map((t, i) => ({ ...t, position: i }));
}
/** Comprueba si el tablero está resuelto */
export function isSolved(tiles) {
    return tiles.every((t, i) => t.value === (i < TOTAL - 1 ? i + 1 : 0));
}
/** Baraja el tablero garantizando que la posición final sea resoluble y distinta al estado resuelto.
 *  El algoritmo de paseo aleatorio sobre movimientos válidos preserva la paridad de inversiones,
 *  por lo que el resultado es siempre solucionable por construcción.
 */
export function shuffle(tiles) {
    let current = [...tiles];
    let moves = 0;
    const MIN_SHUFFLES = 200;
    while (moves < MIN_SHUFFLES || isSolved(current)) {
        const emptyIndex = getEmptyIndex(current);
        const neighbours = getMovableTiles(emptyIndex);
        const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
        const next = moveTile(current, randomNeighbour);
        if (next) {
            current = next;
            moves++;
        }
    }
    return current;
}
//# sourceMappingURL=board.js.map