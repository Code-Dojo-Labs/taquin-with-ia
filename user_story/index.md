# Historias de Usuario — Juego Taquin

> Generadas a partir de los requisitos documentados en [`/requirements`](../requirements/index.md)
> **Fecha:** 16 de marzo de 2026

---

## Estructura

Cada historia de usuario sigue el formato:
> **Como** `[rol]`, **Quiero** `[acción]`, **Para** `[beneficio]`.

Las historias están agrupadas por **épicas funcionales**.

---

## Épica 1 — Tablero de Juego

| ID | Título | Archivo |
|----|--------|---------|
| US-001 | Iniciar partida con tablero barajado solucionable | [US-001.md](US-001.md) |
| US-002 | Mover una pieza adyacente al espacio vacío | [US-002.md](US-002.md) |
| US-003 | Identificar visualmente las piezas movibles | [US-003.md](US-003.md) |
| US-004 | Ver animación de deslizamiento al mover una pieza | [US-004.md](US-004.md) |
| US-005 | Recibir feedback al intentar mover una pieza no válida | [US-005.md](US-005.md) |

## Épica 2 — Seguimiento de la Partida (HUD)

| ID | Título | Archivo |
|----|--------|---------|
| US-006 | Ver el contador de movimientos en pantalla | [US-006.md](US-006.md) |
| US-007 | Ver el cronómetro en formato MM:SS | [US-007.md](US-007.md) |
| US-008 | Arrancar el cronómetro con el primer movimiento | [US-008.md](US-008.md) |

## Épica 3 — Control de la Partida (Pausa)

| ID | Título | Archivo |
|----|--------|---------|
| US-009 | Pausar la partida en curso | [US-009.md](US-009.md) |
| US-010 | Reanudar la partida desde el estado pausado | [US-010.md](US-010.md) |
| US-011 | Ocultar el tablero mientras la partida está en pausa | [US-011.md](US-011.md) |

## Épica 4 — Victoria y Fin de Partida

| ID | Título | Archivo |
|----|--------|---------|
| US-012 | Detectar automáticamente la condición de victoria | [US-012.md](US-012.md) |
| US-013 | Ver un resumen de métricas al finalizar la partida | [US-013.md](US-013.md) |
| US-014 | Iniciar una nueva partida desde la pantalla de victoria | [US-014.md](US-014.md) |

## Épica 5 — Persistencia de Datos

| ID | Título | Archivo |
|----|--------|---------|
| US-015 | Guardar y consultar mis mejores marcas entre sesiones | [US-015.md](US-015.md) |

## Épica 6 — Selección de Puzzle

| ID | Título | Archivo |
|----|--------|---------|
| US-016 | Ver un catálogo de puzzles y seleccionar uno para jugar | [US-016.md](US-016.md) |
| US-017 | Refrescar el catálogo para obtener nuevas opciones de puzzle | [US-017.md](US-017.md) |

---

## Resumen de Cobertura

| Épica | Historias | Requisitos cubiertos |
|-------|-----------|----------------------|
| Tablero de Juego | US-001 → US-005 | §1.3, §1.4, §2.2, §2.3, §3.1, §3.2 |
| HUD | US-006 → US-008 | §3.3 |
| Pausa | US-009 → US-011 | §3.3.3, §3.4 (Estado PAUSADO) |
| Victoria | US-012 → US-014 | §2.5, §3.4 (Estado VICTORIA) |
| Persistencia | US-015 | §4.4 |
| Selección de Puzzle | US-016 → US-017 | §05 completo |
