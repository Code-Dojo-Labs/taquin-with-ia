export class TaquinTile extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'empty', 'movable', 'shake'];
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
    get value() {
        return this.getAttribute('value') ?? '';
    }
    get isEmpty() {
        return this.hasAttribute('empty');
    }
    get isMovable() {
        return this.hasAttribute('movable');
    }
    render() {
        this.shadow.innerHTML = `
      <style>
        @keyframes shake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-5px); }
          40%  { transform: translateX(5px); }
          60%  { transform: translateX(-4px); }
          80%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: 4px;
          transition: transform 200ms ease-in-out;
        }
        :host([shake]) {
          animation: shake 250ms ease-in-out;
        }
        .tile {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${this.isEmpty ? 'transparent' : '#3b82f6'};
          color: white;
          border-radius: 4px;
          box-shadow: ${this.isMovable ? '0 0 0 3px #facc15' : 'none'};
          filter: ${this.isMovable ? 'brightness(1.15)' : 'none'};
        }
      </style>
      <div class="tile">${this.isEmpty ? '' : this.value}</div>
    `;
    }
}
customElements.define('taquin-tile', TaquinTile);
//# sourceMappingURL=TaquinTile.js.map