# Notas de Reunión — Proyecto: Juego Taquin

---

| Campo          | Detalle                                       |
|----------------|-----------------------------------------------|
| **Fecha**      | 15 de marzo de 2026                           |
| **Proyecto**   | Juego Taquin (Puzzle-15)                      |
| **Estado**     | Reunión inicial de requisitos                 |

---

## Resumen Ejecutivo

Se realizó la reunión de arranque del proyecto con el objetivo de identificar y documentar los requisitos fundamentales para el desarrollo del juego clásico **Taquin** (también conocido como el **Juego del 15** o *15-Puzzle*). Durante la sesión se abordaron cuatro grandes ejes:

1. El **contexto del problema**: qué es el juego, cuál es su origen, sus reglas y el objetivo final del jugador.
2. Los **detalles técnicos iniciales**: representaciones abstractas del tablero, validación matemática de movimientos, algoritmos de generación de tableros solucionables y criterios de detección de victoria.
3. La **experiencia de usuario**: interacciones básicas, flujos de pantalla y métricas de seguimiento de la partida.
4. El **stack tecnológico**: elección de tecnologías concretas para la implementación web del juego.

---

## Acuerdos y Decisiones Clave

- El tablero estándar será de **4×4** (15 piezas + 1 espacio vacío), aunque la lógica de negocio debe soportar una dimensión **N×N** configurable.
- La generación aleatoria del tablero debe garantizar que la configuración inicial sea **siempre resoluble**, validada mediante el **algoritmo de paridad de inversiones**.
- La interfaz tendrá **cuatro estados de juego claramente diferenciados**: Inicio, Jugando, Pausado y Victoria.
- El cronómetro **arrancará con el primer movimiento del jugador**, no al cargar la pantalla.
- Durante la pausa, el tablero debe quedar **visualmente oculto** para evitar trampas.
- El stack tecnológico queda definido como **HTML5 + Tailwind CSS + JavaScript Vanilla (ES6+)** con persistencia mediante **`localStorage`**.

---

## Índice de Documentos

| # | Documento | Descripción |
|---|-----------|-------------|
| 1 | [Contexto del Problema](01_contexto_problema.md) | Historia del juego, reglas, objetivo y alcance del proyecto. |
| 2 | [Detalles Técnicos](02_detalles_tecnicos.md) | Estructuras de datos, algoritmos, lógica de movimientos y criterios de victoria. |
| 3 | [Experiencia de Usuario](03_experiencia_usuario.md) | Interacciones, estados de pantalla, HUD y flujos de navegación. |
| 4 | [Stack Tecnológico](04_stack_tecnologico.md) | Tecnologías elegidas, estructura de archivos, persistencia y herramientas de desarrollo. |

---

## Temas Pendientes / Próximos Pasos

- [x] Definir si se incluirá un sistema de puntuaciones (leaderboard) o persistencia de historial de partidas. → **Resuelto:** se persisten mejores marcas con `localStorage` (ver doc 4).
- [ ] Evaluar si futuros modos de juego (p. ej. tablero 3×3 o 5×5) requieren ajustes adicionales en la lógica de solubilidad.
- [ ] Determinar si el juego requerirá soporte de accesibilidad (navegación por teclado, lectores de pantalla, contraste alto).
- [ ] Verificar si se necesita una función de "deshacer movimiento" y cómo afectaría al cronómetro y al contador.
