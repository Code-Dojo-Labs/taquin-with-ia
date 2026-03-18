export class TaquinModal extends HTMLElement {
  private shadow: ShadowRoot;

  static get observedAttributes(): string[] {
    return ['open', 'moves', 'time', 'best-moves', 'best-time', 'new-record'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  get isOpen(): boolean {
    return this.hasAttribute('open');
  }

  get moves(): string {
    return this.getAttribute('moves') ?? '0';
  }

  get time(): string {
    return this.getAttribute('time') ?? '00:00';
  }

  get bestMoves(): string | null {
    return this.getAttribute('best-moves');
  }

  get bestTime(): string | null {
    return this.getAttribute('best-time');
  }

  get isNewRecord(): boolean {
    return this.hasAttribute('new-record');
  }

  private handleNewGame(): void {
    this.dispatchEvent(new CustomEvent('new-game', { bubbles: true, composed: true }));
  }

  render(): void {
    const recordBadge = this.isNewRecord
      ? `<p class="record-badge">🏆 ¡Nuevo récord personal!</p>`
      : '';

    const bestSection =
      this.bestMoves !== null || this.bestTime !== null
        ? `<hr class="divider">
           <p class="best-title">Mejores marcas</p>
           ${this.bestMoves !== null ? `<p class="best-row">Movimientos: <strong>${this.bestMoves}</strong></p>` : ''}
           ${this.bestTime !== null ? `<p class="best-row">Tiempo: <strong>${this.bestTime}</strong></p>` : ''}`
        : '';

    this.shadow.innerHTML = `
      <style>
        .overlay {
          display: ${this.isOpen ? 'flex' : 'none'};
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          align-items: center; justify-content: center;
          z-index: 100;
        }
        .card {
          background: white; border-radius: 12px;
          padding: 32px 40px; text-align: center;
          min-width: 280px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        h2 { margin: 0 0 20px; font-size: 1.75rem; color: #111827; }
        p { color: #4b5563; margin: 6px 0; }
        .metric { font-size: 1.5rem; font-weight: 700; color: #111827; }
        .record-badge {
          color: #d97706; font-weight: 700; font-size: 1rem;
          margin-top: 12px;
        }
        .divider { margin: 16px 0; border: none; border-top: 1px solid #e5e7eb; }
        .best-title { font-size: 0.8rem; color: #9ca3af; text-transform: uppercase;
          letter-spacing: 0.05em; margin-bottom: 4px; }
        .best-row { font-size: 0.875rem; color: #374151; margin: 4px 0; }
        button {
          margin-top: 24px; padding: 10px 28px;
          background: #3b82f6; color: white;
          border: none; border-radius: 6px;
          font-size: 1rem; font-weight: 600; cursor: pointer;
          transition: background 150ms;
        }
        button:hover { background: #2563eb; }
      </style>
      <div class="overlay">
        <div class="card">
          <h2>¡Enhorabuena!</h2>
          <p>Movimientos: <span class="metric">${this.moves}</span></p>
          <p>Tiempo: <span class="metric">${this.time}</span></p>
          ${recordBadge}
          ${bestSection}
          <button id="btn-new">Nueva partida</button>
        </div>
      </div>
    `;

    this.shadow.getElementById('btn-new')?.addEventListener('click', () => this.handleNewGame());
  }
}

customElements.define('taquin-modal', TaquinModal);
