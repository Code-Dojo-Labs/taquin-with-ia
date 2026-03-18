export class TaquinHud extends HTMLElement {
    static get observedAttributes() {
        return ['moves', 'time'];
    }
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
    get moves() {
        return this.getAttribute('moves') ?? '0';
    }
    get time() {
        return this.getAttribute('time') ?? '00:00';
    }
    render() {
        this.shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
          font-size: 1.1rem;
          font-family: monospace;
        }
        .stat { display: flex; flex-direction: column; align-items: center; }
        .label { font-size: 0.75rem; color: #6b7280; text-transform: uppercase; }
        .value { font-weight: bold; }
      </style>
      <div class="stat">
        <span class="label">Movimientos</span>
        <span class="value">${this.moves}</span>
      </div>
      <div class="stat">
        <span class="label">Tiempo</span>
        <span class="value">${this.time}</span>
      </div>
    `;
    }
}
customElements.define('taquin-hud', TaquinHud);
//# sourceMappingURL=TaquinHud.js.map