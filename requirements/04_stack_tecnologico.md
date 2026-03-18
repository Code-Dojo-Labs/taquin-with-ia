# 4. Stack Tecnológico

> **Documento:** `04_stack_tecnologico.md`
> **Parte de:** [Índice de Requisitos](index.md)

---

## 4.1 Resumen del Stack

| Capa | Tecnología | Versión mínima recomendada |
|------|------------|----------------------------|
| **Marcado / Estructura** | HTML5 | — |
| **Componentes de UI** | Web Components (Custom Elements v1 + Shadow DOM v1) | — |
| **Estilos / UI** | Tailwind CSS | v3.x |
| **Lenguaje** | TypeScript | v5.x |
| **Lógica / Comportamiento** | JavaScript (Vanilla, compilado desde TS) | ES2020 target |
| **Persistencia local** | Web Storage API (`localStorage`) | — |
| **Calidad de código** | ESLint + Prettier + EditorConfig | ESLint v9 / Prettier v3 |

---

## 4.2 Justificación de la Elección

### HTML5
- Estándar universal de marcado para aplicaciones web.
- Semántica clara con elementos nativos (`<main>`, `<header>`, `<button>`, `<dialog>`, etc.).
- No requiere compilación ni herramientas de construcción obligatorias.

### Tailwind CSS
- Enfoque *utility-first*: las clases de estilo se aplican directamente en el HTML, reduciendo la necesidad de escribir CSS personalizado.
- Permite construir una interfaz coherente y responsiva sin salir del marcado HTML.
- Altamente configurable mediante `tailwind.config.js` para definir la paleta de colores, tipografía y espaciados del juego.
- Se puede incluir via CDN para el desarrollo y compilar con *PostCSS / CLI* para producción.

### Web Components (Custom Elements + Shadow DOM)
- La interfaz del juego se construirá mediante **componentes nativos del navegador**, sin frameworks de terceros.
- Se utilizan las tres especificaciones centrales de la plataforma Web:
  - **Custom Elements v1:** permite definir nuevas etiquetas HTML reutilizables (p. ej. `<taquin-board>`, `<taquin-tile>`, `<taquin-hud>`, `<taquin-modal>`).
  - **Shadow DOM v1:** encapsula el marcado y los estilos internos de cada componente, evitando colisiones con el CSS global de Tailwind.
  - **HTML Templates (`<template>`):** define la estructura HTML de cada componente de forma declarativa, instanciándola eficientemente en tiempo de ejecución.
- La comunicación entre componentes se realizará mediante **`CustomEvents`** despachados hacia arriba (*bubbling*) y propiedades/atributos hacia abajo.
- Tailwind CSS se aplicará tanto en el documento principal (fuera del Shadow DOM) como, donde necesario, inyectando la hoja de estilos compilada dentro de los Shadow Roots mediante `adoptedStyleSheets` o una etiqueta `<link>` interna.

### TypeScript
- Todo el código fuente se escribirá en **TypeScript (v5.x)**, compilado a JavaScript ES2020 para ejecutar en el navegador.
- Beneficios clave para este proyecto:
  - **Tipado estático:** los modelos de datos del juego (estado del tablero, eventos, opciones de configuración) se definen mediante `interface` y `type`, reduciendo errores en tiempo de ejecución.
  - **Autocompletado e IntelliSense:** mejora la experiencia de desarrollo y la documentación implícita del código.
  - **Detección temprana de errores:** el compilador (`tsc`) detecta fallos lógicos antes de ejecutar el código en el navegador.
  - **Compatibilidad total con Web Components:** TypeScript soporta la definición tipada de Custom Elements mediante la extensión de `HTMLElement`.
- El archivo `tsconfig.json` configurará al menos:
  - `target: "ES2020"`
  - `module: "ESNext"`
  - `strict: true` (modo estricto completo)
  - `outDir: "dist/js"`
  - `rootDir: "src/ts"`

### JavaScript (en navegador)
- El código JavaScript que ejecuta el navegador es **generado automáticamente** por el compilador de TypeScript; no se escribe JS manualmente.
- Aprovecha las APIs nativas modernas del navegador:
  - **DOM API** para manipular las piezas del tablero.
  - **`requestAnimationFrame`** para animaciones fluidas.
  - **`localStorage`** para persistencia local.
  - **`CustomEvents`** para comunicación desacoplada entre módulos.

### `localStorage` (Web Storage API)
- API nativa del navegador, sin configuración ni dependencias adicionales.
- Permite almacenar datos de forma persistente entre sesiones de forma sincrónica y sencilla.
- Los datos se serializan en JSON para su almacenamiento.

---

## 4.3 Estructura de Archivos del Proyecto

```
/
├── index.html                  # Punto de entrada de la aplicación
├── tsconfig.json               # Configuración del compilador TypeScript
├── tailwind.config.js          # Configuración de Tailwind CSS
├── .eslintrc.json              # Reglas de ESLint (con soporte TypeScript)
├── .prettierrc                 # Reglas de formato de Prettier
├── .editorconfig               # Estándares de editor (indent, charset, EOL)
├── src/
│   ├── css/
│   │   └── main.css            # Directivas de Tailwind (@tailwind base/components/utilities)
│   └── ts/
│       ├── main.ts             # Punto de entrada: registra componentes e inicializa el juego
│       ├── types/
│       │   └── game.types.ts   # Interfaces y tipos compartidos (GameState, Tile, etc.)
│       ├── components/
│       │   ├── TaquinBoard.ts  # <taquin-board>  — tablero completo
│       │   ├── TaquinTile.ts   # <taquin-tile>   — pieza individual
│       │   ├── TaquinHud.ts    # <taquin-hud>    — contador y cronómetro
│       │   └── TaquinModal.ts  # <taquin-modal>  — overlay de pausa y victoria
│       ├── board.ts            # Lógica pura del tablero (generación, movimientos, victoria)
│       ├── game.ts             # Máquina de estados de la partida
│       ├── timer.ts            # Lógica del cronómetro
│       └── storage.ts          # Capa de abstracción sobre localStorage
├── dist/                       # Artefactos generados (no editar manualmente)
│   ├── css/
│   │   └── main.css            # CSS compilado y purgado por Tailwind
│   └── js/                     # JS compilado desde TypeScript
└── requirements/               # Documentación de requisitos
    ├── index.md
    ├── 01_contexto_problema.md
    ├── 02_detalles_tecnicos.md
    ├── 03_experiencia_usuario.md
    └── 04_stack_tecnologico.md
```

---

## 4.4 Persistencia con `localStorage`

### Qué se almacenará
En esta primera versión se persisten únicamente las **mejores marcas** del jugador (puntuación local):

| Clave (`key`)         | Tipo    | Descripción                                      |
|-----------------------|---------|--------------------------------------------------|
| `taquin_best_moves`   | Integer | Menor número de movimientos logrado.             |
| `taquin_best_time`    | Integer | Menor tiempo (en segundos) en que se terminó.   |
| `taquin_games_played` | Integer | Total de partidas completadas.                   |

### Formato de Almacenamiento
Los datos se guardan como cadenas JSON. Ejemplo:

```json
{
  "taquin_best_moves": 42,
  "taquin_best_time": 87,
  "taquin_games_played": 5
}
```

### Limitaciones Conocidas
- Los datos son **por navegador y por dominio**; no se sincronizan entre dispositivos.
- `localStorage` tiene un límite aproximado de **5 MB** por origen, más que suficiente para este caso de uso.
- Los datos pueden ser borrados por el usuario desde la configuración del navegador. El juego debe manejar este caso sin errores (inicializando los valores a `0` si la clave no existe).

---

## 4.5 Estándares de Calidad de Código

El proyecto adoptará un conjunto de herramientas obligatorias para garantizar consistencia, legibilidad y ausencia de errores comunes en todo el equipo.

### ESLint
- **Propósito:** análisis estático del código para detectar errores lógicos, patrones problemáticos y violaciones de estilo.
- Se usará el preset **`@typescript-eslint`** para habilitar reglas específicas de TypeScript.
- Reglas clave a activar:
  - `@typescript-eslint/no-explicit-any` — prohíbe el uso de `any`, forzando tipado explícito.
  - `@typescript-eslint/explicit-function-return-type` — exige declarar el tipo de retorno en funciones públicas.
  - `no-console` — evita `console.log` en código de producción.
  - `eqeqeq` — obliga al uso de `===` en comparaciones.
- Archivo de configuración: `.eslintrc.json`.
- Integración con el editor vía extensión **ESLint** para VS Code (errores visibles en tiempo real).

### Prettier
- **Propósito:** formateador de código automático y *opinionated*. Elimina debates sobre estilo tipográfico del código.
- Configuración en `.prettierrc`:
  - `printWidth: 100` — longitud máxima de línea.
  - `tabWidth: 2` — indentación de 2 espacios.
  - `singleQuote: true` — comillas simples en strings.
  - `semi: true` — punto y coma obligatorio.
  - `trailingComma: "es5"` — comas finales donde ES5 las permite.
- Prettier y ESLint se integran mediante **`eslint-config-prettier`** para desactivar las reglas de ESLint que conflictúen con el formateo de Prettier.
- Se ejecuta automáticamente al guardar archivos (configuración del editor) y como paso previo al commit.

### EditorConfig
- **Propósito:** garantiza que todos los editores y IDEs del equipo usen la **misma configuración básica de edición** (codificación, saltos de línea, indentación), independientemente del editor personal de cada desarrollador.
- Archivo de configuración: `.editorconfig` en la raíz del proyecto.
- Configuración mínima requerida:

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### Flujo de Validación

```
Edición de código
       │
       ▼
EditorConfig  ──►  normaliza charset / EOL / indentación en el editor
       │
       ▼
Prettier      ──►  formatea el código al guardar (o en pre-commit hook)
       │
       ▼
ESLint        ──►  detecta errores lógicos y violaciones de reglas TS
       │
       ▼
tsc           ──►  compila TypeScript y valida tipos estrictamente
```

---

## 4.6 Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **Node.js + npm** | Entorno de ejecución para herramientas de build (Tailwind CLI, tsc, ESLint, Prettier). |
| **TypeScript CLI (`tsc`)** | Compilar `.ts` → `.js` y validar tipos. |
| **Tailwind CSS CLI** | Generar `dist/css/main.css` optimizado (purga clases no usadas). |
| **ESLint** | Análisis estático del código TypeScript. |
| **Prettier** | Formateo automático y consistente del código. |
| **EditorConfig** | Normalización de configuración de editor entre desarrolladores. |
| **Live Server** (`npx serve` o extensión VS Code) | Servidor de desarrollo local con recarga automática. |
| **Husky + lint-staged** *(opcional)* | Git hooks para ejecutar ESLint y Prettier automáticamente antes de cada commit. |

> **Nota:** Node.js es una **herramienta de desarrollo**, no de ejecución. El juego final solo requiere un navegador moderno para funcionar; Node.js no es necesario en producción.

---

## 4.7 Compatibilidad de Navegadores Objetivo

| Navegador | Versión mínima |
|-----------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Safari | 14+ |
| Microsoft Edge | 90+ |

Todos los navegadores listados soportan ES2020+, `localStorage`, `requestAnimationFrame`, las APIs de DOM modernas y la especificación completa de **Web Components (Custom Elements v1 + Shadow DOM v1 + HTML Templates)**.
