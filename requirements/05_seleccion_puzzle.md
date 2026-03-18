# Requisito 05 — Selección de Puzzle desde Catálogo

> **Proyecto:** Juego Taquin
> **Fecha:** 18 de marzo de 2026
> **Épica asociada:** Épica 6 — Selección de Puzzle
> **Historias relacionadas:** US-016, US-017

---

## 1. Descripción General

En la versión actual del juego, el tablero inicial se genera de forma completamente aleatoria al cargar la aplicación o al iniciar una nueva partida. Esta funcionalidad agrega una capa de **elección consciente** para el jugador: antes de comenzar, se le presenta un catálogo visual de configuraciones solucionables para que escoja con cuál desea jugar.

Esto transforma el flujo de inicio pasivo (el sistema te da un tablero) en un flujo activo (el jugador elige un tablero), aumentando el control y el compromiso del jugador.

---

## 2. Flujo de usuario

```
[Pantalla principal — estado INICIO]
        │
        ▼
Jugador pulsa "Elegir puzzle"
        │
        ▼
[Modal de catálogo]
  ┌─────────────────────────────────────┐
  │  Elige tu puzzle                    │
  │                                     │
  │  [  #1  ] [  #2  ] [  #3  ]        │
  │  [  #4  ] [  #5  ] [  #6  ]        │
  │                       ↑             │
  │          miniaturas 4×4 interactivas│
  │                                     │
  │        [ 🔀 Nuevas opciones ]       │
  └─────────────────────────────────────┘
        │
        ▼ (jugador hace clic en una miniatura)
[Juego inicia con la configuración elegida]
```

---

## 3. Catálogo de configuraciones

### 3.1 Generación

- El catálogo muestra **6 configuraciones** por defecto.
- Cada configuración se genera al momento de abrir el modal usando el mismo algoritmo de `shuffle()` ya implementado en `board.ts`.
- Todas las configuraciones son **solucionables** (validadas por paridad de inversiones).
- Ninguna configuración puede ser igual al **estado resuelto** `[1, 2, ..., 15, 0]`.
- Las 6 configuraciones son **distintas entre sí** (no se repiten tableros dentro del mismo conjunto).

### 3.2 Miniatura visual

Cada opción del catálogo se representa como una cuadrícula 4×4 a escala reducida que muestra:
- El número de cada pieza en su posición actual.
- El espacio vacío diferenciado visualmente (fondo oscuro sin número).
- Un borde o resaltado al hacer hover.
- Un número de orden visible (`#1` … `#6`) como etiqueta.

### 3.3 Refrescar opciones

- El modal incluye un botón **"🔀 Nuevas opciones"** que descarta las 6 configuraciones actuales y genera 6 nuevas.
- El proceso de refresco es inmediato (no hay animaciones de carga).

---

## 4. Integración con el flujo de juego

| Situación | Comportamiento |
|-----------|---------------|
| Jugador elige una configuración del catálogo | El modal se cierra; el tablero se inicializa con la configuración elegida; el estado pasa a `'idle'` |
| Jugador cierra el modal sin elegir (clic fuera o botón ✕) | El modal se cierra; el tablero actual permanece sin cambios |
| El jugador ya tiene una partida en curso (`'playing'`) | El botón "Elegir puzzle" aparece deshabilitado o muestra confirmación antes de descartar la partida en curso |
| El jugador está en pausa | El botón "Elegir puzzle" aparece deshabilitado |

---

## 5. Componentes afectados / nuevos

| Componente / Archivo | Tipo de cambio |
|----------------------|---------------|
| `<taquin-catalog>` | **Nuevo** Web Component — modal con la cuadrícula de opciones |
| `src/ts/components/TaquinCatalog.ts` | **Nuevo** — lógica y estilos del catálogo |
| `src/ts/main.ts` | **Modificado** — botón "Elegir puzzle", handler de apertura/cierre y recepción de evento `puzzle-selected` |
| `index.html` | **Modificado** — añadir `<taquin-catalog>` y el botón de acceso |

---

## 6. Eventos personalizados

| Evento | Emitido por | Payload | Descripción |
|--------|-------------|---------|-------------|
| `puzzle-selected` | `<taquin-catalog>` | `{ tiles: Tile[] }` | El jugador eligió una configuración del catálogo |
| `catalog-closed` | `<taquin-catalog>` | — | El modal fue cerrado sin selección |

---

## 7. Restricciones y consideraciones técnicas

- La lógica de generación reutiliza `shuffle(createSolvedBoard())` de `board.ts` — **no requiere nuevas funciones** de generación.
- Las miniaturas se renderizan con HTML/CSS puro dentro del Shadow DOM de `<taquin-catalog>` (sin canvas).
- El tamaño de celda de las miniaturas debe ser responsive pero por defecto ~40px × 40px con `font-size: 0.75rem`.
- El refresco no guarda estado: si el jugador cierra y vuelve a abrir el modal, se genera un nuevo conjunto.
- **Sin dependencias externas nuevas** — solo TypeScript y CSS inline en Shadow DOM.
