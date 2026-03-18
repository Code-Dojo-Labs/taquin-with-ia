# 2. Detalles Técnicos

> **Documento:** `02_detalles_tecnicos.md`
> **Parte de:** [Índice de Requisitos](index.md)

---

## 2.1 Representación del Tablero

### Estructura de Datos Abstracta
El tablero debe modelarse como una colección ordenada y bidimensionalmente indexable de **N×N** celdas, donde cada celda contiene:
- Un **valor entero positivo** entre `1` y `N²-1` para las piezas numeradas.
- Un **valor centinela** (convencionalmente `0` o `null`) para el espacio vacío.

Se puede implementar como:
- Una **matriz bidimensional** de dimensiones `[N][N]`, con acceso mediante coordenadas `(fila, columna)`.
- Un **arreglo unidimensional** de longitud `N²`, con la conversión de índice plano `i = fila * N + columna`.

Ambas representaciones son equivalentes. La elección entre una u otra dependerá de las conveniencias del lenguaje seleccionado, pero la lógica de negocio debe ser independiente de esta decisión.

### Ejemplo: Tablero 4×4 (arreglo plano)
```
Índice:  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
Valor:   5   1   2   3   9   6   7   4  13  10  11   8   0  14  15  12
```
En este ejemplo, el `0` (espacio vacío) se encuentra en el índice `12`, que corresponde a la coordenada matricial `(3, 0)` (fila 3, columna 0).

---

## 2.2 Lógica de Movimientos Válidos

### Definición de Movimiento
Un **movimiento válido** consiste en intercambiar la posición del espacio vacío con la de una pieza adyacente. Solo las piezas directamente adyacentes (en horizontal o vertical, nunca en diagonal) al espacio vacío pueden moverse.

### Regla de Adyacencia

Dado que el espacio vacío se encuentra en la coordenada `(fv, cv)` (fila vacío, columna vacío), una pieza en la coordenada `(fp, cp)` es candidata a moverse si y solo si su **Distancia de Manhattan** con el espacio vacío es exactamente `1`:

$$d_{Manhattan}(v, p) = |f_v - f_p| + |c_v - c_p| = 1$$

Esto garantiza:
- Se excluyen movimientos diagonales (`|Δfila| = 1` y `|Δcolumna| = 1` simultáneamente).
- Se excluyen piezas no adyacentes (disticia > 1).
- Solo las 4 piezas cardinales (arriba, abajo, izquierda, derecha) del espacio vacío son candidatas.

### Tabla de Movimientos Posibles según Posición del Vacío

| Posición del Vacío | Movimientos posibles |
|--------------------|----------------------|
| Esquina            | 2 piezas             |
| Borde (no esquina) | 3 piezas             |
| Interior           | 4 piezas             |

### Ejecución del Movimiento
Al confirmar la validez, el movimiento se ejecuta **intercambiando** el valor de la celda de la pieza con el valor del espacio vacío. La posición lógica del vacío se actualiza a las coordenadas anteriores de la pieza desplazada.

---

## 2.3 Generación de Tableros Solucionables

### El Problema de la Solubilidad
No todas las permutaciones posibles del tablero son resolubles. Para un tablero de **N×N**, exactamente la mitad de las $N^2!$ permutaciones posibles son irresolubles. Un tablero generado aleatoriamente tiene una probabilidad del 50% de ser irresoluble si no se aplica una validación.

### Definición de Inversión
Se define una **inversión** como un par ordenado de piezas `(a, b)` tal que:
- `a` aparece antes que `b` en la secuencia lineal del tablero (leída fila por fila, de izquierda a derecha).
- `a > b` (el valor mayor precede al menor).
- El espacio vacío (`0`) **no se cuenta** en el cálculo de inversiones.

### Criterio Matemático de Solubilidad

Sea `I` el número total de inversiones del tablero y `F_v` la fila del espacio vacío contada **desde la base** (fila inferior = fila 1):

#### Caso A — Tablero de dimensión **impar** (ej. 3×3):
> El tablero es **resoluble** si y solo si `I` es **par**.

#### Caso B — Tablero de dimensión **par** (ej. 4×4):
> El tablero es **resoluble** si y solo si:
> - `F_v` es **par** e `I` es **impar**.
> - `F_v` es **impar** e `I` es **par**.
>
> En otras palabras: `(F_v + I)` debe ser **impar**.

### Algoritmo de Inicialización

```
FUNCIÓN generarTableroSoluble(N):
    1. Crear arreglo con valores [1..N²-1, 0] (piezas + espacio vacío).
    2. Barajar el arreglo aleatoriamente (Fisher-Yates u equivalente).
    3. Calcular inversiones I sobre el arreglo resultante.
    4. Determinar F_v (fila del vacío desde la base).
    5. Evaluar criterio de solubilidad según dimensión N:
       - Si el tablero ES resoluble: retornar el arreglo.
       - Si el tablero NO ES resoluble: intercambiar dos piezas adyacentes
         distintas al espacio vacío (esto invierte la paridad de I sin
         cambiar F_v), y retornar el arreglo corregido.
FIN FUNCIÓN
```

> **Nota:** El intercambio corrector debe hacerse entre dos piezas que **no sean el espacio vacío**, preferiblemente las dos primeras piezas numeradas de la secuencia.

---

## 2.4 Cálculo del Número de Inversiones

### Algoritmo

```
FUNCIÓN contarInversiones(arreglo, N):
    I ← 0
    PARA i DESDE 0 HASTA N²-2:
        SI arreglo[i] = 0: CONTINUAR  // ignorar el espacio vacío
        PARA j DESDE i+1 HASTA N²-1:
            SI arreglo[j] = 0: CONTINUAR
            SI arreglo[i] > arreglo[j]:
                I ← I + 1
    RETORNAR I
FIN FUNCIÓN
```

**Complejidad:** O(N⁴) en el peor caso para un tablero N×N. Para N=4, esto equivale a como máximo 120 comparaciones — completamente asumible.

---

## 2.5 Detección del Estado de Victoria

### Condición de Victoria
El juego está ganado cuando el estado actual del tablero es idéntico al **estado objetivo**:

```
estado_objetivo = [1, 2, 3, ..., N²-1, 0]
```

(Arreglo plano, fila por fila, con el espacio vacío `0` en el último índice.)

### Cuándo Verificar
La verificación debe ejecutarse **únicamente al finalizar cada movimiento válido**, nunca continuamente en un bucle paralelo, para no impactar el rendimiento.

### Algoritmo

```
FUNCIÓN esVictoria(tableroActual, N):
    PARA i DESDE 0 HASTA N²-2:
        SI tableroActual[i] ≠ i + 1:
            RETORNAR FALSO
    SI tableroActual[N²-1] ≠ 0:
        RETORNAR FALSO
    RETORNAR VERDADERO
FIN FUNCIÓN
```

---

## 2.6 Modelo de Estado de la Partida

El sistema debe mantener un **objeto de estado central** que encapsule toda la información relevante de la partida en curso:

| Campo               | Tipo          | Descripción                                                      |
|---------------------|---------------|------------------------------------------------------------------|
| `tablero`           | Arreglo[N²]   | Configuración actual de todas las celdas.                        |
| `posicionVacio`     | Entero (índice plano) o `{fila, columna}` | Posición actual del espacio vacío. |
| `contadorMovimientos` | Entero ≥ 0  | Número de movimientos válidos realizados.                        |
| `tiempoTranscurrido`  | Entero (ms o s) | Tiempo acumulado desde el primer movimiento.                  |
| `estadoJuego`       | Enumerado     | Uno de: `INICIO`, `JUGANDO`, `PAUSADO`, `VICTORIA`.              |
| `dimension`         | Entero N      | Tamaño del lado del tablero (defecto: `4`).                      |

### Transiciones de Estado

```
INICIO ──(primer movimiento)──► JUGANDO
JUGANDO ──(acción pausa)──► PAUSADO
PAUSADO ──(acción reanudar)──► JUGANDO
JUGANDO ──(victoria detectada)──► VICTORIA
VICTORIA ──(acción nueva partida)──► INICIO
PAUSADO ──(acción abandonar)──► INICIO  [opcional]
```
