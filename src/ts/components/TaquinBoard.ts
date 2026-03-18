export class TaquinBoard extends HTMLElement {
  private shadow: ShadowRoot;

  static get observedAttributes(): string[] {
    return ['paused'];
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

  get isPaused(): boolean {
    return this.hasAttribute('paused');
  }

  render(): void {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          padding: 12px;
          background: #d1d5db;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 80px);
          grid-template-rows: repeat(4, 80px);
          gap: 6px;
        }
        slot {
          display: contents;
        }
        .overlay {
          display: ${this.isPaused ? 'flex' : 'none'};
          position: absolute;
          inset: 0;
          background: rgba(17, 24, 39, 0.88);
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 0.05em;
          font-family: monospace;
        }
      </style>
      <div class="grid"><slot></slot></div>
      <div class="overlay">⏸ PAUSA</div>
    `;
  }
}

customElements.define('taquin-board', TaquinBoard);
