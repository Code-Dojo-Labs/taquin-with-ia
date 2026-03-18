import './components/TaquinBoard.js';
import './components/TaquinTile.js';
import './components/TaquinHud.js';
import './components/TaquinModal.js';
import './components/TaquinCatalog.js';

import { createInitialState, applyMove } from './game.js';
import { getEmptyIndex, getMovableTiles } from './board.js';
import { Timer } from './timer.js';
import { saveResult, loadScores } from './storage.js';
import type { GameState, Tile } from './types/game.types.js';

const BOARD_SIZE = 4;
const CELL_SIZE = 86; // 80px pieza + 6px hueco

let state: GameState = createInitialState();
let isAnimating = false;
const timer = new Timer();

const boardEl = document.querySelector('taquin-board') as HTMLElement;
const hudEl = document.querySelector('taquin-hud') as HTMLElement;
const modalEl = document.querySelector('taquin-modal') as HTMLElement;
const catalogEl = document.querySelector('taquin-catalog') as HTMLElement;
const btnPause = document.querySelector('#btn-pause') as HTMLButtonElement;
const btnCatalog = document.querySelector('#btn-catalog') as HTMLButtonElement;

function renderBoard(): void {
  boardEl.innerHTML = '';
  const emptyIndex = getEmptyIndex(state.tiles);
  const movable = new Set(getMovableTiles(emptyIndex));
  state.tiles.forEach((tile, index) => {
    const el = document.createElement('taquin-tile') as HTMLElement;
    if (tile.value === 0) {
      el.setAttribute('empty', '');
    } else {
      el.setAttribute('value', String(tile.value));
      if (movable.has(index)) el.setAttribute('movable', '');
      el.addEventListener('click', () => handleTileClick(index));
    }
    boardEl.appendChild(el);
  });
}

function renderHud(): void {
  hudEl.setAttribute('moves', String(state.moves));
  hudEl.setAttribute('time', Timer.format(timer.elapsed()));
}

function renderPauseBtn(): void {
  const isPaused = state.status === 'paused';
  const canPause = state.status === 'playing' || state.status === 'paused';
  btnPause.textContent = isPaused ? 'Reanudar' : 'Pausar';
  btnPause.disabled = !canPause;
}

function renderCatalogBtn(): void {
  // Solo disponible en estado INICIO (idle); deshabilitado en el resto
  btnCatalog.disabled = state.status !== 'idle';
}

function handleTileClick(index: number): void {
  if (isAnimating) return;
  if (state.status !== 'playing' && state.status !== 'idle') return;

  const emptyIndex = getEmptyIndex(state.tiles);
  if (!getMovableTiles(emptyIndex).includes(index)) {
    // US-005: feedback visual sutil en pieza no movible
    const tileEl = boardEl.querySelectorAll('taquin-tile')[index] as HTMLElement;
    tileEl.setAttribute('shake', '');
    tileEl.addEventListener('animationend', () => tileEl.removeAttribute('shake'), { once: true });
    return;
  }

  isAnimating = true;

  // Calcular desplazamiento en píxeles hacia el hueco
  const tx = ((emptyIndex % BOARD_SIZE) - (index % BOARD_SIZE)) * CELL_SIZE;
  const ty = (Math.floor(emptyIndex / BOARD_SIZE) - Math.floor(index / BOARD_SIZE)) * CELL_SIZE;

  const tileEl = boardEl.querySelectorAll('taquin-tile')[index] as HTMLElement;
  tileEl.style.transform = `translate(${tx}px, ${ty}px)`;

  // El estado se actualiza solo al finalizar la animación (US-002)
  tileEl.addEventListener('transitionend', () => {
    const wasIdle = state.status === 'idle';
    state = applyMove(state, index);

    // US-008: el cronómetro arranca en el primer movimiento válido
    if (wasIdle && state.status === 'playing') {
      timer.start();
    }

    renderBoard();
    renderHud();
    renderPauseBtn();
    renderCatalogBtn();
    isAnimating = false;

    if (state.status === 'won') {
      // Capturar elapsed ANTES de stop() — stop() resetea el acumulado
      const elapsed = timer.elapsed();
      timer.stop();

      // US-015: Detectar récord ANTES de guardar para poder indicarlo en el modal
      const prevScores = loadScores();
      saveResult(state.moves, elapsed);
      const bestScores = loadScores();

      const newMovesRecord = prevScores.bestMoves === null || state.moves < prevScores.bestMoves;
      const newTimeRecord = prevScores.bestTime === null || elapsed < prevScores.bestTime;

      // US-013: Mostrar métricas en el modal de victoria
      modalEl.setAttribute('moves', String(state.moves));
      modalEl.setAttribute('time', Timer.format(elapsed));
      if (bestScores.bestMoves !== null)
        modalEl.setAttribute('best-moves', String(bestScores.bestMoves));
      if (bestScores.bestTime !== null)
        modalEl.setAttribute('best-time', Timer.format(bestScores.bestTime));
      if (newMovesRecord || newTimeRecord)
        modalEl.setAttribute('new-record', '');
      else
        modalEl.removeAttribute('new-record');

      renderCatalogBtn();
      modalEl.setAttribute('open', '');
    }
  }, { once: true });
}

function startNewGame(tiles?: Tile[]): void {
  timer.stop();
  state = tiles
    ? { tiles, moves: 0, status: 'idle', startTime: null, elapsedTime: 0 }
    : createInitialState();
  // El timer NO arranca aquí: lo hace con el primer movimiento (US-008)
  boardEl.removeAttribute('paused');
  modalEl.removeAttribute('open');
  catalogEl.removeAttribute('open');
  renderBoard();
  renderHud();
  renderPauseBtn();
  renderCatalogBtn();
}

// Escucha evento del modal para nueva partida
document.addEventListener('new-game', () => startNewGame());

// US-016: Abre el catálogo de puzzles
btnCatalog.addEventListener('click', () => catalogEl.setAttribute('open', ''));

// US-016: Puzzle seleccionado en el catálogo
document.addEventListener('puzzle-selected', (e) => {
  const { tiles } = (e as CustomEvent<{ tiles: Tile[] }>).detail;
  startNewGame(tiles);
});

// Pausa / Reanuda (US-009 / US-010)
function handlePauseToggle(): void {
  if (state.status === 'playing') {
    timer.pause();
    state = { ...state, status: 'paused' };
    boardEl.setAttribute('paused', '');
  } else if (state.status === 'paused') {
    timer.resume();
    state = { ...state, status: 'playing' };
    boardEl.removeAttribute('paused');
  }
  renderPauseBtn();
  renderCatalogBtn();
}
btnPause.addEventListener('click', handlePauseToggle);

// HUD tick cada segundo
setInterval(() => {
  if (state.status === 'playing') renderHud();
}, 1000);

// Arrancar
startNewGame();
