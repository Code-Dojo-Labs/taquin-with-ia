# Resumen de la Sesión de Trabajo — Proyecto Taquin

> **Fecha:** 16 de marzo de 2026
> **Objetivo general:** Documentar los requisitos, definir el stack tecnológico, generar las historias de usuario y crear los tickets en Linear para el juego Taquin (puzzle 15).

---

## Paso 1 — Notas de requisitos

Se crearon 4 documentos en la carpeta `requirements/` que capturan todos los requisitos del juego:

| Archivo | Contenido |
|---------|-----------|
| `requirements/index.md` | Índice maestro con resumen ejecutivo y tabla de pendientes |
| `requirements/01_contexto_problema.md` | Contexto del juego, reglas del tablero 4×4, alcance v1 |
| `requirements/02_detalles_tecnicos.md` | Estructuras de datos, lógica de movimientos, algoritmo de solvabilidad, detección de victoria |
| `requirements/03_experiencia_usuario.md` | Estados de UI (INICIO, JUGANDO, PAUSADO, VICTORIA), HUD, interacciones, animaciones |

---

## Paso 2 — Stack tecnológico

Se definió el stack completo y se documentó en `requirements/04_stack_tecnologico.md`:

| Capa | Tecnología |
|------|------------|
| Marcado | HTML5 |
| Componentes UI | Web Components (Custom Elements v1 + Shadow DOM v1) |
| Estilos | Tailwind CSS v3.x |
| Lenguaje | TypeScript 5.x (`strict: true`, `target: ES2020`) |
| Persistencia | `localStorage` API |
| Calidad de código | ESLint v9 + Prettier v3 + EditorConfig |

**Componentes definidos:** `<taquin-board>`, `<taquin-tile>`, `<taquin-hud>`, `<taquin-modal>`

**Estructura de archivos definida:**
```
src/ts/main.ts
src/ts/types/game.types.ts
src/ts/components/(TaquinBoard|TaquinTile|TaquinHud|TaquinModal).ts
src/ts/(board|game|timer|storage).ts
src/css/main.css
dist/css/main.css
dist/js/
```

**Claves de localStorage:**
- `taquin_best_moves` — récord de movimientos
- `taquin_best_time` — récord de tiempo (segundos)
- `taquin_games_played` — total de partidas completadas

---

## Paso 3 — Historias de usuario

Se generaron **15 historias de usuario** en la carpeta `user_story/` organizadas en 5 épicas, con formato "Como/Quiero/Para" y **criterios de aceptación en Gherkin** (Dado/Cuando/Entonces):

### Épica 1 — Tablero de Juego
| Archivo | Título |
|---------|--------|
| `user_story/US-001.md` | Iniciar partida con tablero barajado solucionable |
| `user_story/US-002.md` | Mover una pieza adyacente al espacio vacío |
| `user_story/US-003.md` | Identificar visualmente las piezas movibles |
| `user_story/US-004.md` | Ver animación de deslizamiento al mover una pieza |
| `user_story/US-005.md` | Recibir feedback al intentar mover una pieza no válida |

### Épica 2 — Seguimiento de la Partida (HUD)
| Archivo | Título |
|---------|--------|
| `user_story/US-006.md` | Ver el contador de movimientos en pantalla |
| `user_story/US-007.md` | Ver el cronómetro en formato MM:SS |
| `user_story/US-008.md` | Arrancar el cronómetro con el primer movimiento |

### Épica 3 — Control de la Partida (Pausa)
| Archivo | Título |
|---------|--------|
| `user_story/US-009.md` | Pausar la partida en curso |
| `user_story/US-010.md` | Reanudar la partida desde el estado pausado |
| `user_story/US-011.md` | Ocultar el tablero mientras la partida está en pausa |

### Épica 4 — Victoria y Fin de Partida
| Archivo | Título |
|---------|--------|
| `user_story/US-012.md` | Detectar automáticamente la condición de victoria |
| `user_story/US-013.md` | Ver un resumen de métricas al finalizar la partida |
| `user_story/US-014.md` | Iniciar una nueva partida desde la pantalla de victoria |

### Épica 5 — Persistencia de Datos
| Archivo | Título |
|---------|--------|
| `user_story/US-015.md` | Guardar y consultar mis mejores marcas entre sesiones |

---

## Paso 4 — Tickets en Linear

Se crearon **16 tickets** en el proyecto **Taquin** del equipo **Jmendez** en Linear, con el formato Markdown correcto (bloques Gherkin con triple backtick renderizados).

### Ticket de setup
| ID | Título | Estado |
|----|--------|--------|
| JME-46 | [Setup] Configuración del entorno de desarrollo y stack tecnológico | Todo |

### Tickets de historias de usuario (estado: Backlog)
| ID | Historia |
|----|---------|
| JME-32 | US-001: Iniciar partida con tablero barajado solucionable |
| JME-31 | US-002: Mover una pieza adyacente al espacio vacío |
| JME-35 | US-003: Identificar visualmente las piezas movibles |
| JME-34 | US-004: Ver animación de deslizamiento al mover una pieza |
| JME-33 | US-005: Recibir feedback al intentar mover una pieza no válida |
| JME-39 | US-006: Ver el contador de movimientos en pantalla |
| JME-37 | US-007: Ver el cronómetro en formato MM:SS |
| JME-36 | US-008: Arrancar el cronómetro con el primer movimiento |
| JME-40 | US-009: Pausar la partida en curso |
| JME-38 | US-010: Reanudar la partida desde el estado pausado |
| JME-45 | US-011: Ocultar el tablero mientras la partida está en pausa |
| JME-43 | US-012: Detectar automáticamente la condición de victoria |
| JME-44 | US-013: Ver un resumen de métricas al finalizar la partida |
| JME-41 | US-014: Iniciar una nueva partida desde la pantalla de victoria |
| JME-42 | US-015: Guardar y consultar mis mejores marcas entre sesiones |

---

## Paso 5 — Configuración de Copilot

Se creó `.github/copilot-instructions.md` con los valores por defecto de Linear para que Copilot los use automáticamente en futuras conversaciones:

- **Team:** `Jmendez`
- **Project:** `Taquin`
- **ProjectId:** `0c12012d-0718-40d6-bbff-456aadfa61e2`
- **Estados:** Backlog / Todo / In Progress / Done con sus IDs correspondientes

---

## Paso 6 — Implementación del setup (JME-46)

Se implementó el ticket **JME-46** creando toda la estructura de código del proyecto desde cero. Estado del ticket: **Done ✅**.

### Archivos de configuración creados

| Archivo | Descripción |
|---------|-------------|
| `package.json` | Scripts `build`, `lint`, `format` + devDependencies |
| `tsconfig.json` | `strict: true`, `ES2020`, `ESNext`, `outDir: dist/js`, `rootDir: src/ts` |
| `tailwind.config.js` | Content paths apuntando a `src/ts/**/*.ts` e `index.html` |
| `eslint.config.mjs` | Flat config ESLint 9 + `typescript-eslint` v8 + `eslint-config-prettier` |
| `.prettierrc` | `printWidth: 100`, `singleQuote: true`, `trailingComma: "es5"`, `semi: true` |
| `.editorconfig` | `utf-8`, `lf`, `indent=2`, `insert_final_newline=true` |
| `index.html` | HTML5 base con `<taquin-hud>`, `<taquin-board>`, `<taquin-modal>` |

> **Nota:** ESLint 9 usa flat config (`eslint.config.mjs`). Se instaló `typescript-eslint@8.x` (compatible con ESLint 9) en lugar del legacy `@typescript-eslint@7.x`.

### Código fuente creado (`src/`)

| Archivo | Descripción |
|---------|-------------|
| `src/css/main.css` | `@tailwind base/components/utilities` |
| `src/ts/types/game.types.ts` | Interfaces `GameState`, `Tile`, `BestScores`, tipo `GameStatus` |
| `src/ts/components/TaquinBoard.ts` | Web Component `<taquin-board>` con Shadow DOM, grid 4×4 |
| `src/ts/components/TaquinTile.ts` | Web Component `<taquin-tile>` con atributos `value` y `empty` |
| `src/ts/components/TaquinHud.ts` | Web Component `<taquin-hud>` con atributos `moves` y `time` |
| `src/ts/components/TaquinModal.ts` | Web Component `<taquin-modal>` — overlay de victoria con evento `new-game` |
| `src/ts/board.ts` | Lógica completa: `createSolvedBoard`, `shuffle`, `moveTile`, `isSolved`, `getMovableTiles` |
| `src/ts/game.ts` | Estado de partida: `createInitialState`, `applyMove` |
| `src/ts/timer.ts` | Clase `Timer` con `start/pause/resume/stop/elapsed` y `Timer.format(ms)` |
| `src/ts/storage.ts` | `loadScores` / `saveResult` usando `localStorage` con las 3 claves definidas |
| `src/ts/main.ts` | Punto de entrada: orquesta componentes, estado, timer y tick del HUD |

### Pipeline verificado

```
tsc --noEmit   → sin errores ✅
eslint         → sin errores ✅
npm run build  → CSS (87 ms) + JS compilados ✅
```

---

## Paso 7 — Labels en Linear

Se asignaron labels a los 16 tickets del proyecto siguiendo este criterio:

- **Feature** — funcionalidades de negocio core (mecánica de juego, cronómetros, contadores, flujos, persistencia, setup)
- **Improvement** — mejoras de UX/percepción visual sobre funcionalidades ya existentes

| Label | Tickets |
|-------|---------|
| Feature | JME-31, JME-32, JME-36, JME-37, JME-38, JME-39, JME-40, JME-41, JME-42, JME-43, JME-44, JME-46 |
| Improvement | JME-33, JME-34, JME-35, JME-45 |

---

## Estado actual del proyecto

```
taller_ia/
├── .github/
│   └── copilot-instructions.md        ✅ Instrucciones de Copilot
├── .vscode/
│   └── mcp.json                       ✅ Servidor MCP Linear configurado
├── requirements/
│   ├── index.md                       ✅
│   ├── 01_contexto_problema.md        ✅
│   ├── 02_detalles_tecnicos.md        ✅
│   ├── 03_experiencia_usuario.md      ✅
│   └── 04_stack_tecnologico.md        ✅
├── user_story/
│   ├── index.md                       ✅
│   └── US-001.md … US-015.md          ✅ (15 historias)
├── src/
│   ├── css/main.css                   ✅
│   └── ts/
│       ├── types/game.types.ts        ✅
│       ├── components/
│       │   ├── TaquinBoard.ts         ✅
│       │   ├── TaquinTile.ts          ✅
│       │   ├── TaquinHud.ts           ✅
│       │   └── TaquinModal.ts         ✅
│       ├── board.ts                   ✅
│       ├── game.ts                    ✅
│       ├── timer.ts                   ✅
│       ├── storage.ts                 ✅
│       └── main.ts                    ✅
├── dist/                              ✅ Generado por build
├── node_modules/                      ✅ npm install completado
├── package.json                       ✅
├── tsconfig.json                      ✅
├── tailwind.config.js                 ✅
├── eslint.config.mjs                  ✅
├── .prettierrc                        ✅
├── .editorconfig                      ✅
├── index.html                         ✅
└── steps/
    └── resumen_sesion.md              ✅ Este archivo
```

### Tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46 ([Setup]) |
| Backlog | JME-31 a JME-45 (15 historias de usuario) |

## Paso 8 — JME-32: US-001 Iniciar partida con tablero barajado solucionable

Ticket completado: **Done ✅**

### Criterios satisfechos

| Criterio | Implementación |
|----------|---------------|
| Tablero 4×4 con 15 piezas + espacio vacío en posiciones aleatorias | `shuffle(createSolvedBoard())` en `board.ts` |
| Configuración siempre solucionable | Algoritmo de paseo aleatorio sobre movimientos válidos (preserva paridad de inversiones por construcción) |
| Tablero inicial nunca coincide con el estado resuelto | Bucle `while (moves < 200 \|\| isSolved(current))` en `shuffle()` |
| HUD muestra 0 movimientos y 00:00 al cargar | Estado inicial `status: 'idle'`, `startTime: null`; `Timer.elapsed()` devuelve 0 → `"00:00"` |
| Tablero interactivo sin acción adicional | `handleTileClick` permite clics en estado `'idle'` además de `'playing'` |

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/ts/board.ts` | `shuffle()`: condición del bucle cambiada a `moves < 200 \|\| isSolved(current)` para garantizar tablero ≠ resuelto |
| `src/ts/game.ts` | `createInitialState()`: `status: 'idle'`, `startTime: null` |
| `src/ts/main.ts` | `startNewGame()`: eliminado `timer.start()` (el timer arranca en el primer movimiento). `handleTileClick()`: permite estado `'idle'`; inicia timer en el primer movimiento válido |
| `src/ts/components/TaquinBoard.ts` | Grid con celdas fijas `repeat(4, 80px)`, `slot { display: contents }` para distribución correcta |

### Pipeline

```
tsc --noEmit  → sin errores ✅
eslint        → sin errores ✅
```

---

## Estado actual del proyecto

### Tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46 ([Setup]), JME-32 (US-001) |
| In Progress | — |
| Backlog | JME-31, JME-33 a JME-45 (14 historias restantes) |

---

## Paso 9 — JME-31: US-002 Mover una pieza adyacente al espacio vacío

Ticket completado: **Done ✅** (18 de marzo de 2026)

### Criterios satisfechos

| Criterio | Implementación |
|----------|---------------|
| La pieza se desliza hacia el espacio vacío al hacer clic | Animación CSS `transform: translate(tx, ty)` aplicada al elemento DOM de la pieza antes de actualizar el estado |
| Solo se mueven piezas adyacentes en horizontal/vertical | Validación con `getMovableTiles(emptyIndex)` antes de iniciar la animación |
| Bloqueo de entrada durante la animación | Flag `isAnimating` que retorna inmediatamente en `handleTileClick` mientras hay transición en curso |
| Contador se incrementa al **finalizar** la animación, no al iniciarla | `applyMove` (y `renderBoard`/`renderHud`) se ejecutan dentro del callback `transitionend` con `{ once: true }` |

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/ts/components/TaquinTile.ts` | Añadida `transition: transform 200ms ease-in-out` al `:host` para habilitar la animación CSS |
| `src/ts/main.ts` | Import de `getEmptyIndex` y `getMovableTiles` desde `board.ts`; constantes `BOARD_SIZE` y `CELL_SIZE = 86`; flag `isAnimating`; `handleTileClick` refactorizado con cálculo de `tx`/`ty`, aplicación de `transform` y listener `transitionend` |

### Pipeline

```
tsc --noEmit  → sin errores ✅
```

---

## Estado actual del proyecto

### Tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46 ([Setup]), JME-32 (US-001), JME-31 (US-002) |
| In Progress 🔄 | — |
| Backlog | JME-33 a JME-45 (13 historias restantes) |

---

## Paso 10 — JME-35, JME-34, JME-33: Épica 1 completada

Implementación de US-003, US-004 y US-005. Todos los tickets cerrados: **Done ✅** (18 de marzo de 2026)

### JME-35 — US-003: Identificar visualmente las piezas movibles

| Criterio | Implementación |
|----------|---------------|
| Piezas adyacentes al hueco visualmente diferenciadas | Atributo `movable` en `<taquin-tile>` activa `box-shadow: 0 0 0 3px #facc15` (anillo amarillo) + `filter: brightness(1.15)` |
| Piezas no movibles sin indicador | Solo se asigna `movable` a los índices devueltos por `getMovableTiles()` |
| Indicador actualizado tras cada movimiento | `renderBoard()` recalcula `getMovableTiles()` en cada llamada; se invoca al finalizar la animación |

**Archivos modificados:**
- `src/ts/components/TaquinTile.ts` — `movable` añadido a `observedAttributes`; getter `isMovable`; estilos `box-shadow` y `filter` condicionados
- `src/ts/main.ts` — `renderBoard()` calcula `movable = new Set(getMovableTiles(emptyIndex))` y aplica el atributo

### JME-34 — US-004: Ver animación de deslizamiento al mover una pieza

Cerrado como **Done** sin cambios de código adicionales. Todos los criterios cubiertos por la implementación de JME-31:
- Transición CSS `200ms ease-in-out` (dentro de rango 100–200ms requerido)
- No bloquea hilo principal (CSS transition)
- `isAnimating` + `transitionend` restaura interactividad y actualiza indicadores

### JME-33 — US-005: Recibir feedback al intentar mover una pieza no válida

| Criterio | Implementación |
|----------|---------------|
| Feedback visual sutil < 300ms en pieza no adyacente | `@keyframes shake` de 250ms aplicado vía atributo `shake` en `<taquin-tile>` |
| La pieza no se desplaza | `return` inmediato tras disparar el shake sin llamar a `applyMove` |
| Sin mensajes de error ni modales | Solo animación CSS, sin alerts ni DOM changes |
| Contador no se incrementa | `applyMove` nunca se llama en este flujo |

**Archivos modificados:**
- `src/ts/components/TaquinTile.ts` — `shake` añadido a `observedAttributes`; `@keyframes shake` + `:host([shake])` en estilos
- `src/ts/main.ts` — `handleTileClick` dispara `shake` y escucha `animationend` para removerlo

### Pipeline

```
tsc --noEmit  → sin errores ✅
```

---

## Estado actual del proyecto

### Tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46 ([Setup]), JME-32 (US-001), JME-31 (US-002), JME-35 (US-003), JME-34 (US-004), JME-33 (US-005) |
| In Progress 🔄 | — |
| Backlog | JME-36 a JME-45 (10 historias restantes — Épicas 2, 3, 4 y 5) |

---

## Paso 11 — Épicas 2 y 3 completadas

### Épica 2 — Seguimiento de la Partida (HUD): JME-39, JME-37, JME-36

Los 3 tickets cerrados como **Done ✅** sin cambios de código — todos los criterios ya estaban satisfechos por implementaciones previas:

| Ticket | Criterios cubiertos |
|--------|---------------------|
| JME-39 (US-006) | Contador en `TaquinHud` con atributo `moves`; incrementa en `transitionend`; no incrementa en shake; conserva valor en victoria |
| JME-37 (US-007) | `Timer.format(ms)` → `MM:SS` con ceros; fuente monospace en HUD; tick cada segundo solo en `'playing'`; congela en pausa y victoria |
| JME-36 (US-008) | Estado inicial `'idle'`; `timer.start()` solo cuando `wasIdle && status === 'playing'`; `timer.stop()` + reset en `startNewGame()` |

---

### Épica 3 — Control de la Partida (Pausa): JME-40, JME-38, JME-45

Implementados y cerrados: **Done ✅** (18 de marzo de 2026)

#### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/ts/components/TaquinBoard.ts` | Añadidos `observedAttributes(['paused'])`, `attributeChangedCallback`, getter `isPaused`. Estructura de Shadow DOM cambiada: `:host` pasa a `display: block; position: relative` con `.grid` interno (display: grid) y `.overlay` `position: absolute; inset:0` con fondo oscuro semiopaco que se muestra solo cuando `paused` está activo |
| `index.html` | Añadido `<button id="btn-pause">` con estilos Tailwind, `disabled` por defecto |
| `src/ts/main.ts` | `const btnPause`; función `renderPauseBtn()` (sincroniza texto Pausar/Reanudar y `disabled`); función `handlePauseToggle()` que alterna `timer.pause/resume`, `state.status`, y atributo `paused` del tablero; `renderPauseBtn()` llamado en `startNewGame()`, tras `transitionend` y en toggle |

#### Criterios satisfechos

| Criterio | Implementación |
|----------|---------------|
| Botón visible y accesible durante JUGANDO | `btnPause.disabled = false` cuando `status === 'playing'` |
| Pausa no disponible en INICIO y VICTORIA | `btnPause.disabled = true`; `handlePauseToggle` solo actúa en `'playing'` / `'paused'` |
| Cronómetro congelado al pausar | `timer.pause()` acumula el elapsed; el `setInterval` de HUD solo renderiza en `'playing'` |
| Tablero no interactivo en pausa | `handleTileClick` retorna si `status !== 'playing' && status !== 'idle'` |
| Overlay oscuro cubre el tablero | `.overlay { position: absolute; inset: 0; background: rgba(17,24,39,0.88) }` en Shadow DOM de `TaquinBoard` |
| Reanudar: timer, tablero y contador intactos | `timer.resume()` continúa desde acumulado; `renderBoard()` no se invoca (estado de piezas no cambia); counter no toca |
| Botón cambia de texto según estado | `btnPause.textContent = isPaused ? 'Reanudar' : 'Pausar'` |

#### Pipeline

```
tsc --noEmit  → sin errores ✅
```

---

## Estado actual del proyecto

### Tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46, JME-32, JME-31, JME-35, JME-34, JME-33, JME-39, JME-37, JME-36, JME-40, JME-38, JME-45 |
| In Progress 🔄 | — |
| Backlog | JME-43, JME-44, JME-41, JME-42 (Épicas 4 y 5) |

## Próximos pasos sugeridos

1. Continuar con la **Épica 4 — Victoria y Fin de Partida**: JME-43 (US-012), JME-44 (US-013), JME-41 (US-014).
2. Cerrar con la **Épica 5 — Persistencia**: JME-42 (US-015).
3. Mover a **In Progress** el ticket correspondiente al comenzar cada historia.

---

## Paso 12 — Épicas 4 y 5 completadas: Victoria y Persistencia

### Épica 4 — Victoria y Fin de Partida: JME-43, JME-44, JME-41

#### JME-43 — US-012: Detectar automáticamente la condición de victoria

Cerrado como **Done ✅** — la lógica ya existía en el código; se corrigió un bug crítico de orden de llamadas.

| Criterio | Implementación |
|----------|---------------|
| Victoria detectada tras el movimiento decisivo | `applyMove` en `game.ts` llama a `isSolved()` → si devuelve `true`, `status: 'won'` |
| Cronómetro congelado en el tiempo exacto | **Bug fix**: ahora se captura `elapsed` ANTES de llamar `timer.stop()` (antes se invertía el orden y `elapsed` devolvía 0) |
| Tablero bloqueado al detectar victoria | `handleTileClick` retorna inmediatamente si `status !== 'playing' && status !== 'idle'` |
| Verificación no ejecutada en clics inválidos | El flujo de shake hace `return` antes de llegar a `applyMove` |

**Bug corregido en `src/ts/main.ts`:**
```typescript
// ANTES (bug): stop() resetea accumulated → elapsed() = 0
timer.stop();
const elapsed = timer.elapsed(); // siempre devolvía 0 ❌

// AHORA (correcto): capturar antes de resetear
const elapsed = timer.elapsed(); // tiempo real de la partida ✅
timer.stop();
```

---

#### JME-44 — US-013: Ver un resumen de métricas al finalizar la partida

Cerrado como **Done ✅** — `TaquinModal` mejorado con métricas destacadas y sección de mejores marcas.

| Criterio | Implementación |
|----------|---------------|
| Panel overlay de victoria prominente | `TaquinModal` con `position: fixed; inset: 0` y opacidad semitransparente |
| Mensaje de felicitación visible | `<h2>¡Enhorabuena!</h2>` en la card |
| Movimientos y tiempo en tamaño grande | CSS `.metric { font-size: 1.5rem; font-weight: 700 }` |
| Coherencia con HUD | `elapsed` capturado antes de `timer.stop()` y pasado al modal y al HUD con el mismo valor |
| Panel no se puede cerrar sin nueva partida | Solo el botón "Nueva partida" emite el evento `new-game` |

---

#### JME-41 — US-014: Iniciar una nueva partida desde la pantalla de victoria

Cerrado como **Done ✅** — ya estaba implementado desde el setup; verificado correcto.

| Criterio | Implementación |
|----------|---------------|
| Botón "Nueva partida" en el panel | `<button id="btn-new">Nueva partida</button>` en `TaquinModal` |
| Reinicio completo | `startNewGame()`: `timer.stop()`, `createInitialState()`, `modalEl.removeAttribute('open')`, `renderBoard()`, `renderHud()`, `renderPauseBtn()` |
| Estado INICIO (no PLAYING) | `createInitialState()` → `status: 'idle'` → timer no arranca hasta el primer movimiento |

---

### Épica 5 — Persistencia: JME-42

#### JME-42 — US-015: Guardar y consultar mis mejores marcas entre sesiones

Cerrado como **Done ✅** — `storage.ts` ya gestiona localStorage; integrado en flujo de victoria y modal.

| Criterio | Implementación |
|----------|---------------|
| Actualización de récord de movimientos | `saveResult` en `storage.ts`: guarda si es menor que el actual o si no hay valor previo |
| Actualización de récord de tiempo | Ídem para `taquin_best_time` en ms |
| Incremento de partidas jugadas | `taquin_games_played` + 1 en cada llamada a `saveResult` |
| Arranque sin datos previos | `loadScores()` inicializa con `null` los campos inexistentes; no lanza excepciones |
| Comparación visible en el modal | `TaquinModal` recibe `best-moves` y `best-time` → muestra sección "Mejores marcas" |
| Indicador de nuevo récord | `TaquinModal` recibe atributo `new-record` → muestra badge "🏆 ¡Nuevo récord personal!" |

**Flujo en `main.ts` al ganar:**
```typescript
const elapsed = timer.elapsed();           // capturar tiempo
timer.stop();

const prevScores = loadScores();           // marcas anteriores (antes de guardar)
saveResult(state.moves, elapsed);          // guardar nueva partida
const bestScores = loadScores();           // marcas actualizadas

const newMovesRecord = prevScores.bestMoves === null || state.moves < prevScores.bestMoves;
const newTimeRecord  = prevScores.bestTime  === null || elapsed < prevScores.bestTime;

modalEl.setAttribute('moves', String(state.moves));
modalEl.setAttribute('time', Timer.format(elapsed));
if (bestScores.bestMoves !== null) modalEl.setAttribute('best-moves', String(bestScores.bestMoves));
if (bestScores.bestTime  !== null) modalEl.setAttribute('best-time', Timer.format(bestScores.bestTime));
if (newMovesRecord || newTimeRecord) modalEl.setAttribute('new-record', '');
else modalEl.removeAttribute('new-record');
modalEl.setAttribute('open', '');
```

---

### Archivos modificados en el Paso 12

| Archivo | Cambio |
|---------|--------|
| `src/ts/main.ts` | Bug fix orden `elapsed/stop`; import `loadScores`; detección de récord; pasa `best-moves`, `best-time`, `new-record` al modal |
| `src/ts/components/TaquinModal.ts` | Nuevos atributos `best-moves`, `best-time`, `new-record`; sección "Mejores marcas"; badge récord; métricas con `.metric` (1.5rem bold) |

### Pipeline

```
tsc --noEmit  → sin errores ✅
eslint        → sin errores ✅
```

---

## Estado actual del proyecto — COMPLETADO ✅

### Todos los tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46, JME-32, JME-31, JME-35, JME-34, JME-33, JME-39, JME-37, JME-36, JME-40, JME-38, JME-45, JME-43, JME-44, JME-41, JME-42 |
| In Progress 🔄 | — |
| Backlog | — |

**El proyecto Taquin v1 está completamente implementado (16/16 tickets Done).**

---

## Paso 13 — Nueva funcionalidad: Épica 6 — Selección de Puzzle

**Fecha:** 18 de marzo de 2026

Se definió una nueva épica completa para permitir al jugador elegir activamente el puzzle con el que quiere jugar, en lugar de recibir uno aleatorio. Esta épica **no modifica ningún código existente** — es un requisito nuevo aún pendiente de implementación.

### Artefactos generados

| Artefacto | Archivo | Descripción |
|-----------|---------|-------------|
| Requisito | `requirements/05_seleccion_puzzle.md` | Flujo de usuario, estructura del catálogo, eventos personalizados, componentes afectados |
| Historia | `user_story/US-016.md` | Ver catálogo de 6 puzzles y seleccionar uno |
| Historia | `user_story/US-017.md` | Refrescar el catálogo para obtener nuevas opciones |
| Índice US | `user_story/index.md` | Añadida Épica 6 con tabla de las 2 nuevas historias |
| Tickets | JME-47 (US-016), JME-48 (US-017) | Creados en Linear con estado Backlog y label Feature |

### Tickets creados en Linear

| ID | Historia | Estado | Label |
|----|----------|--------|-------|
| JME-47 | US-016: Ver un catálogo de puzzles y seleccionar uno para jugar | Backlog | Feature |
| JME-48 | US-017: Refrescar el catálogo para obtener nuevas opciones de puzzle | Backlog | Feature |

### Resumen técnico del diseño

**Componente nuevo:** `<taquin-catalog>` — Web Component con Shadow DOM

- Modal overlay con 6 miniaturas 4×4 (cuadrículas HTML/CSS, ~40px × 40px, sin canvas)
- Cada miniatura generada al vuelo con `shuffle(createSolvedBoard())`  
- Botón **"🔀 Nuevas opciones"** reemplaza las 6 con nuevas configuraciones
- Botón **✕** y clic fuera del panel cierran sin selección
- Evento `puzzle-selected: { tiles: Tile[] }` emitido al elegir
- Botón "Elegir puzzle" en `index.html` deshabilitado cuando `status === 'playing' || status === 'paused'`

---

## Estado actual del proyecto

### Todos los tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46, JME-32, JME-31, JME-35, JME-34, JME-33, JME-39, JME-37, JME-36, JME-40, JME-38, JME-45, JME-43, JME-44, JME-41, JME-42 |
| Backlog | JME-47 (US-016), JME-48 (US-017) |

## Próximos pasos sugeridos

1. Implementar **JME-47 (US-016)**: crear `TaquinCatalog.ts`, añadir `<taquin-catalog>` a `index.html`, cablear en `main.ts`.
2. Implementar **JME-48 (US-017)**: añadir el botón "🔀 Nuevas opciones" dentro del catálogo.

---

## Paso 14 — Épica 6 completada: Selección de Puzzle (JME-47, JME-48)

**Fecha:** 18 de marzo de 2026

### Archivos creados / modificados

| Archivo | Tipo | Cambio |
|---------|------|--------|
| `src/ts/components/TaquinCatalog.ts` | **Nuevo** | Web Component `<taquin-catalog>` completo |
| `index.html` | Modificado | Añadido `<button id="btn-catalog">` y `<taquin-catalog>` |
| `src/ts/main.ts` | Modificado | Import, references, `renderCatalogBtn()`, handler `puzzle-selected`, `startNewGame(tiles?)` |

---

### JME-47 — US-016: Ver catálogo y seleccionar puzzle ✅

| Criterio | Implementación |
|----------|---------------|
| Modal con 6 miniaturas 4×4 al pulsar "Elegir puzzle" | `attributeChangedCallback` con `value !== null` → `generateOptions()` → `render()` |
| Cada miniatura muestra cuadrícula con posiciones reales | `renderThumbnail()`: grid CSS 4×4 de 36px × 36px, celdas azules con valor numérico |
| Etiqueta `#1 … #6` visible en cada miniatura | `<span class="label">#${idx + 1}</span>` |
| Selección carga el puzzle elegido | Evento `puzzle-selected: { tiles: Tile[] }` con `composed: true` → `startNewGame(tiles)` |
| Cerrar con ✕ o clic fuera no cambia el tablero | `handleClose()` solo hace `removeAttribute('open')` sin emitir selección |
| Botón deshabilitado durante JUGANDO/PAUSADO/VICTORIA | `btnCatalog.disabled = state.status !== 'idle'` |

### JME-48 — US-017: Refrescar el catálogo ✅

| Criterio | Implementación |
|----------|---------------|
| "🔀 Nuevas opciones" reemplaza las 6 miniaturas | `handleRefresh()`: `this.options = this.generateOptions(); this.render()` |
| Refresco inmediato (sin spinner) | `generateOptions()` es síncrono; `render()` re-escribe `innerHTML` |
| El refresco no persiste entre aperturas | Las opciones solo se regeneran en `attributeChangedCallback` al recibir `open` |

---

### Detalles técnicos de `TaquinCatalog.ts`

```typescript
// Genera 6 tableros únicos y solucionables
private generateOptions(): Tile[][] {
  const options: Tile[][] = [];
  while (options.length < CATALOG_SIZE) {
    const candidate = shuffle(createSolvedBoard());
    const key = candidate.map(t => t.value).join(',');
    if (!options.some(o => o.map(t => t.value).join(',') === key))
      options.push(candidate);
  }
  return options;
}
```

- **Eventos:** `puzzle-selected: CustomEvent<{ tiles: Tile[] }>` · `catalog-closed: CustomEvent`
- **Shadow DOM:** miniaturas CSS puro, sin canvas; overlay `position: fixed; inset: 0; z-index: 200`
- **Integración:** `startNewGame(tiles?)` acepta tiles opcionales — si se suministran, usa esa configuración; si no, genera una nueva aleatoriamente

### Pipeline

```
tsc --noEmit  → sin errores ✅
eslint        → sin errores ✅
```

---

## Estado actual del proyecto — COMPLETADO ✅

### Todos los tickets en Linear

| Estado | Tickets |
|--------|---------|
| Done ✅ | JME-46, JME-32, JME-31, JME-35, JME-34, JME-33, JME-39, JME-37, JME-36, JME-40, JME-38, JME-45, JME-43, JME-44, JME-41, JME-42, JME-47, JME-48 |
| In Progress / Backlog | — |

**18/18 tickets Done. Proyecto Taquin v1 + Épica 6 completamente implementado.**
