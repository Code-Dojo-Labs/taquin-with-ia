# 3. Experiencia de Usuario (UX)

> **Documento:** `03_experiencia_usuario.md`
> **Parte de:** [Índice de Requisitos](index.md)

---

## 3.1 Principios Generales de UX

- **Claridad:** El jugador debe poder identificar en todo momento qué piezas puede mover y cuál es el espacio vacío.
- **Respuesta inmediata:** Cada acción del usuario debe tener una retroalimentación visual instantánea.
- **Sin ambigüedades:** El juego debe comunicar claramente cuándo ha ganado, cuándo está en pausa y cuándo puede interactuar.
- **Fluidez:** Las transiciones entre estados de pantalla y los movimientos de piezas deben ser animados y suaves, sin saltos abruptos.

---

## 3.2 Interacción Principal: Mover Piezas

### Mecanismo de Activación
El jugador selecciona una pieza adyacente al espacio vacío mediante:
- **Puntero (ratón):** Clic sobre la pieza deseada.
- **Pantalla táctil:** Tap (toque simple) sobre la pieza deseada.

No se requiere arrastrar (*drag-and-drop*) la pieza manualmente. El sistema interpreta el tap/clic sobre una pieza adyacente válida y **ejecuta automáticamente el deslizamiento** hacia el espacio vacío.

### Retroalimentación Visual del Movimiento
- La pieza se desplaza con una **animación de deslizamiento suave** hacia la celda vacía.
- La duración de la animación debe ser corta (orientativamente entre 100 ms y 200 ms) para no interrumpir el ritmo del jugador.
- Durante la animación, el tablero permanece **bloqueado a nuevas entradas** para evitar movimientos concurrentes.

### Cursor / Indicador de Interactividad
- Las piezas que **pueden moverse** (adyacentes al vacío) deben diferenciarse visualmente de las que no pueden, para orientar al jugador. El mecanismo exacto queda a criterio de diseño (cambio de cursor, borde de color, sombra, etc.).

### Piezas No Adyacentes
- Si el jugador hace clic/tap sobre una pieza que **no es adyacente** al espacio vacío, la acción se ignora silenciosamente o genera un sutil feedback visual de "no disponible" (vibración, parpadeo tenue). No se muestra ningún mensaje de error explícito para no interrumpir el flujo.

---

## 3.3 HUD — Información en Pantalla Durante la Partida

El área de información visible durante el juego incluirá como mínimo:

### 3.3.1 Contador de Movimientos
- Valor numérico entero, inicialmente en `0`.
- Se incrementa en `1` cada vez que un movimiento válido es **completado** (al finalizar la animación de deslizamiento, no al iniciarla).
- El contador **no se decrementa** en ningún caso (no existe "deshacer" en v1).
- Etiqueta sugerida: `Movimientos` o `Moves`.

### 3.3.2 Cronómetro
- Formato de visualización: `MM:SS` (minutos y segundos, con cero a la izquierda cuando corresponda). Ejemplo: `03:07`.
- El cronómetro **permanece en `00:00` hasta que el jugador realiza el primer movimiento**.
- Una vez iniciado, avanza de forma continua segundo a segundo.
- El cronómetro se **detiene al pausar** la partida y se **reanuda** al desbloquearla.
- El cronómetro se **congela** al alcanzar el estado de victoria (muestra el tiempo final del juego).

### 3.3.3 Botón de Pausa
- Debe estar visible y accesible en todo momento durante el estado `JUGANDO`.
- Al activarse, transiciona el juego al estado `PAUSADO`.
- Cuando el juego está en `PAUSADO`, el mismo botón (o uno adyacente) permite **reanudar**.

---

## 3.4 Estados de la Interfaz

La interfaz tiene cuatro estados mutuamente excluyentes. Cada uno define qué elementos son visibles e interactivos.

---

### Estado 1: INICIO

**Cuándo se muestra:**
- Al cargar la aplicación por primera vez.
- Después de que el jugador decide "Jugar de Nuevo" desde la pantalla de victoria.

**Descripción:**
- El tablero aparece en pantalla con las piezas barajadas en una configuración inicial solucionable.
- El contador de movimientos muestra `0`.
- El cronómetro muestra `00:00` y está detenido.
- El tablero es **interactivo**: el jugador puede comenzar a mover piezas en cualquier momento.
- Al realizar el **primer movimiento**, la partida transiciona automáticamente al estado `JUGANDO` y el cronómetro arranca.

**Elementos visibles:**
- Tablero de juego (interactivo).
- Contador de movimientos (`0`).
- Cronómetro (`00:00`, detenido).

---

### Estado 2: JUGANDO

**Cuándo se muestra:**
- Inmediatamente después del primer movimiento del jugador.

**Descripción:**
- El tablero está completamente interactivo.
- El cronómetro avanza en tiempo real.
- El contador se incrementa con cada movimiento.
- El botón de pausa está disponible.
- Tras cada movimiento, el sistema verifica si se alcanzó el estado de victoria.

**Elementos visibles:**
- Tablero de juego (interactivo).
- Contador de movimientos (activo).
- Cronómetro (corriendo).
- Botón de pausa.

---

### Estado 3: PAUSADO

**Cuándo se muestra:**
- Al presionar el botón de pausa durante el estado `JUGANDO`.

**Descripción:**
- El cronómetro se **detiene** (no avanza).
- El tablero queda **no interactivo**: ningún clic o toque sobre las piezas tiene efecto.
- El tablero debe quedar **visualmente bloqueado** para impedir que el jugador estudie la posición de las piezas con el tiempo congelado. Estrategias sugeridas:
  - Superposición semitransparente oscura sobre el tablero con el texto "PAUSADO".
  - Desenfoque (*blur*) del tablero.
  - Reemplazo visual del tablero por un panel de pausa.
- Un botón/acción de "Reanudar" está disponible y es la única interacción posible (además de, opcionalmente, "Abandonar partida").

**Elementos visibles:**
- Tablero bloqueado / oculto.
- Mensaje o indicador de pausa.
- Botón "Reanudar".
- Opcionalmente: Botón "Abandonar partida" (regresa al estado `INICIO` con tablero nuevo).

---

### Estado 4: VICTORIA

**Cuándo se muestra:**
- Cuando el sistema detecta que el tablero ha alcanzado el estado objetivo tras un movimiento.

**Descripción:**
- El cronómetro se **congela** mostrando el tiempo final.
- El tablero queda **no interactivo**.
- Se muestra una **pantalla o panel de victoria** (overlay, modal, o pantalla completa) con:
  - Mensaje de felicitación.
  - **Número total de movimientos** realizados.
  - **Tiempo total** empleado en formato `MM:SS`.
  - Botón de "**Jugar de Nuevo**" que genera un nuevo tablero aleatorio solucionable y retorna al estado `INICIO`.

**Elementos visibles:**
- Panel / Overlay de victoria.
- Resumen de métricas (movimientos y tiempo).
- Botón "Jugar de Nuevo".

---

## 3.5 Flujo de Navegación Completo

```
┌─────────────────────────────────────────────────────────────┐
│                         [INICIO]                            │
│  Tablero barajado · Movimientos: 0 · Tiempo: 00:00          │
└───────────────────────┬─────────────────────────────────────┘
                        │ Primer movimiento del jugador
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                        [JUGANDO]                            │
│  Tablero interactivo · Contador activo · Cronómetro corriendo│
└────────┬────────────────────────────────────┬───────────────┘
         │ Botón Pausa                         │ Victoria detectada
         ▼                                     ▼
┌──────────────────────┐              ┌──────────────────────┐
│      [PAUSADO]       │              │      [VICTORIA]      │
│  Tablero bloqueado   │              │  Overlay de logro    │
│  Cronómetro detenido │              │  Métricas finales    │
│  Botón "Reanudar"    │              │  Botón "Jugar Nuevo" │
└────────┬─────────────┘              └────────┬─────────────┘
         │ Botón Reanudar                       │ Botón "Jugar Nuevo"
         │                                      │
         └──────────────► [JUGANDO]             └──► [INICIO]
```

---

## 3.6 Consideraciones de Diseño Visual (Agnósticas a Tecnología)

Estos son lineamientos de diseño de alto nivel que deben respetarse independientemente del entorno de implementación:

| Elemento | Lineamiento |
|----------|-------------|
| **Piezas** | Deben ser cuadradas, claramente numeradas y con buen contraste entre número y fondo. |
| **Espacio vacío** | Debe diferenciarse visualmente de las piezas (fondo más oscuro, sin número). |
| **Piezas movibles** | Indicación sutil pero perceptible (sombra, borde resaltado, cambio de cursor). |
| **Animación de movimiento** | Suave y corta (100-200 ms). Sin parpadeos ni "teletransporte". |
| **Tablero en pausa** | Completamente inaccesible visualmente para evitar trampas. |
| **Panel de victoria** | Prominente, con buen diseño tipográfico para las métricas. Accesible sobre el tablero. |
| **Tipografía del HUD** | Legible, monoespacio preferiblemente en el cronómetro para evitar saltos de ancho. |
