# 1. Contexto del Problema

> **Documento:** `01_contexto_problema.md`
> **Parte de:** [Índice de Requisitos](index.md)

---

## 1.1 ¿Qué es el Juego Taquin?

El **Taquin** (del francés *taquin*, que significa "molestoso" o "provocador") es un rompecabezas deslizante inventado por **Noyes Palmer Chapman** alrededor de 1874-1880 y popularizado masivamente por el matemático estadounidense Sam Loyd. Es uno de los puzzles más icónicos de la historia de las matemáticas recreativas y de la inteligencia artificial, dado que fue uno de los primeros problemas en los que se exploraron algoritmos de búsqueda heurística como el **A\***.

En su versión más conocida, el tablero es de **4×4** y contiene **15 piezas** numeradas del 1 al 15, con un **espacio vacío** que actúa como hueco de maniobra.

---

## 1.2 Historia y Relevancia

- El puzzle fue un fenómeno cultural en la década de 1880, distribuyéndose físicamente como juguete.
- Sam Loyd ofreció un famoso premio de $1,000 USD por resolver una configuración específica que, matemáticamente, es irresoluble: demostrar esto fue un hito en la teoría de la permutación de grupos.
- En el campo de la Inteligencia Artificial, el 8-puzzle (versión 3×3) es un problema de referencia clásico para demostrar algoritmos de búsqueda como **BFS**, **DFS**, **A\*** y **IDA\***.
- Su implementación como videojuego es un ejercicio canónico en programación, especialmente para comprender manejo de estados, validación de invariantes matemáticos y diseño de interfaces interactivas.

---

## 1.3 Descripción del Juego

El juego se desarrolla sobre un tablero cuadriculado de dimensiones **N×N**. La versión estándar para este proyecto es **4×4**:

- **15 piezas** numeradas del `1` al `15`.
- **1 celda vacía** (espacio libre de maniobra).
- Las piezas solo pueden deslizarse horizontal o verticalmente hacia el espacio vacío adyacente.
- **No es posible** levantar, rotar ni saltar piezas.

### Estado Inicial
El tablero comienza en una **permutación aleatoria** de las 15 piezas y el espacio vacío dispersos por el tablero. Esta configuración inicial debe cumplir el criterio matemático de solubilidad (ver [Detalles Técnicos § 2.3](02_detalles_tecnicos.md)).

### Estado Final (Victoria)
El tablero queda resuelto cuando las piezas están ordenadas de **izquierda a derecha y de arriba hacia abajo** en orden numérico ascendente, con el espacio vacío en la esquina **inferior derecha**:

```
 1   2   3   4
 5   6   7   8
 9  10  11  12
13  14  15  [ ]
```

---

## 1.4 Objetivo del Jugador

Reordenar todas las piezas del tablero hasta alcanzar el estado final descrito, usando el **menor número de movimientos posible** y en el **menor tiempo posible**.

Ambas métricas (movimientos y tiempo) serán visibles en pantalla durante la partida y mostradas al finalizar el juego.

---

## 1.5 Alcance del Proyecto

### Incluido en esta versión
- Tablero jugable de **4×4** (15 piezas).
- Generación aleatoria de tableros garantizando **solubilidad matemática**.
- Control de estado del juego: Inicio, Jugando, Pausado y Victoria.
- Contador de movimientos y cronómetro activos durante la partida.
- Pantalla de victoria con resumen de métricas.
- Reinicio completo del juego con un nuevo tablero al terminar.

### Fuera de alcance (versión inicial)
- Modos multijugador o versus.
- Sistema de puntuaciones persistentes (leaderboard).
- Tableros de tamaño diferente al 4×4 (deseables a futuro, pero no requeridos en v1).
- Función de "deshacer movimiento".
- Asistente de resolución automática o pistas.

---

## 1.6 Restricciones del Proyecto

| Restricción | Descripción |
|-------------|-------------|
| **Stack tecnológico** | No definido en esta etapa. Los requisitos son agnósticos a la tecnología. |
| **Plataforma objetivo** | Por definir. Los requisitos deben ser válidos para entornos visuales interactivos (escritorio y/o móvil). |
| **Solubilidad garantizada** | Todos los tableros generados deben ser matemáticamente resolubles por el jugador. |
| **Rendimiento** | Las animaciones y validaciones deben ejecutarse de forma fluida sin bloquear la interacción del usuario. |
