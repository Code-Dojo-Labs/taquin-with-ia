# Taquin — Puzzle 15

> Implementación del clásico juego del 15 (*15-puzzle*) con TypeScript, Web Components y Tailwind CSS.

---

## Demo rápida

```bash
npm install
npm run dev
# abre http://localhost:3000
```

---

## Características

- **Tablero 4×4** con 15 piezas y un espacio vacío generado aleatoriamente y siempre resoluble.
- **Animación de deslizamiento** al mover piezas (CSS `transition: transform 200ms`).
- **Indicadores visuales** de piezas movibles (anillo amarillo) y feedback de clic inválido (shake).
- **HUD** con contador de movimientos y cronómetro MM:SS.
- **Pausa / Reanuda** — el tablero queda oculto con overlay oscuro durante la pausa.
- **Modal de victoria** con métricas finales, mejores marcas y badge de nuevo récord.
- **Persistencia** de mejores marcas en `localStorage` entre sesiones.
- **Catálogo de puzzles** — elige entre 6 configuraciones solucionables antes de jugar; refresca para obtener nuevas opciones.

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Lenguaje | TypeScript 5.x (`strict: true`, `target: ES2020`) |
| UI | Web Components — Custom Elements v1 + Shadow DOM v1 |
| Estilos | Tailwind CSS v3.x |
| Persistencia | `localStorage` API |
| Linting | ESLint 9 (flat config) + `typescript-eslint` v8 |
| Formato | Prettier v3 |
| Dev server | `live-server` + `concurrently` |

---

## Estructura del proyecto

```
taquin/
├── index.html                        # Punto de entrada HTML
├── src/
│   ├── css/
│   │   └── main.css                  # @tailwind base/components/utilities
│   └── ts/
│       ├── main.ts                   # Orquestador principal
│       ├── board.ts                  # Lógica del tablero (shuffle, moveTile, isSolved…)
│       ├── game.ts                   # Estado de partida (createInitialState, applyMove)
│       ├── timer.ts                  # Timer con pause/resume y formato MM:SS
│       ├── storage.ts                # Récords en localStorage
│       ├── types/
│       │   └── game.types.ts         # GameState, Tile, BestScores, GameStatus
│       └── components/
│           ├── TaquinBoard.ts        # <taquin-board> — grid 4×4 con overlay de pausa
│           ├── TaquinTile.ts         # <taquin-tile> — pieza individual con animaciones
│           ├── TaquinHud.ts          # <taquin-hud> — contador y cronómetro
│           ├── TaquinModal.ts        # <taquin-modal> — overlay de victoria
│           └── TaquinCatalog.ts      # <taquin-catalog> — selector de puzzle
├── dist/                             # Generado por el build (no se versionea)
├── requirements/                     # Documentos de requisitos
├── user_story/                       # Historias de usuario (US-001 … US-017)
└── steps/
    └── resumen_sesion.md             # Bitácora de sesiones de desarrollo
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload en `http://localhost:3000` |
| `npm run build` | Compila CSS (Tailwind) y TypeScript en `dist/` |
| `npm run build:css` | Solo compila Tailwind CSS |
| `npm run build:ts` | Solo compila TypeScript |
| `npm run lint` | Ejecuta ESLint sobre `src/ts/**/*.ts` |
| `npm run lint:fix` | ESLint con auto-fix |
| `npm run format` | Formatea con Prettier |
| `npm run format:check` | Verifica formato sin modificar archivos |

---

## Primeros pasos

### Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9

### Instalación

```bash
git clone <url-del-repo>
cd taquin
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre automáticamente tres procesos en paralelo:
1. `tailwindcss --watch` — recompila CSS ante cambios en fuentes.
2. `tsc --watch` — recompila TypeScript ante cambios.
3. `live-server` — sirve `index.html` en `http://localhost:3000` con recarga automática al cambiar `dist/`.

### Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/css/main.css` y `dist/js/`.

---

## Cómo se juega

1. Al cargar la página se muestra un tablero 4×4 barajado y resoluble.
2. Haz clic en cualquier pieza **adyacente al espacio vacío** para deslizarla.
3. Las piezas movibles se resaltan con un **anillo amarillo**; un clic inválido produce una animación de **shake**.
4. El cronómetro arranca con **el primer movimiento**.
5. Usa **Pausar / Reanudar** para congelar el tiempo y ocultar el tablero.
6. Usa **Elegir puzzle** para seleccionar una de 6 configuraciones del catálogo (solo disponible en estado INICIO).
7. Al ordenar todas las piezas en `[1 … 15, vacío]` aparece el **modal de victoria** con tus métricas y las mejores marcas guardadas.

---

## Estado del juego

```
INICIO ──► JUGANDO ──► PAUSADO
              │             │
              └──────────────┘
              │
              ▼
           VICTORIA ──► INICIO (nueva partida)
```

| Estado | Descripción |
|--------|-------------|
| `idle` | Tablero cargado, timer detenido, primer movimiento pendiente |
| `playing` | Partida en curso, timer activo |
| `paused` | Timer congelado, tablero cubierto por overlay|
| `won` | Puzzle resuelto, modal de victoria visible |

---

## Persistencia

Las mejores marcas se guardan automáticamente en `localStorage`:

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `taquin_best_moves` | `number` | Menor número de movimientos registrado |
| `taquin_best_time` | `number` (ms) | Menor tiempo registrado |
| `taquin_games_played` | `number` | Total de partidas completadas |

---

## Componentes Web

| Elemento | Atributos observados | Eventos emitidos |
|----------|---------------------|-----------------|
| `<taquin-board>` | `paused` | — |
| `<taquin-tile>` | `value`, `empty`, `movable`, `shake` | — |
| `<taquin-hud>` | `moves`, `time` | — |
| `<taquin-modal>` | `open`, `moves`, `time`, `best-moves`, `best-time`, `new-record` | `new-game` |
| `<taquin-catalog>` | `open` | `puzzle-selected`, `catalog-closed` |

---

## Licencia

MIT
