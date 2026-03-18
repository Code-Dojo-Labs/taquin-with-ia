import { shuffle, createSolvedBoard } from '../board.js';
const CATALOG_SIZE = 6;
export class TaquinCatalog extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }
    constructor() {
        super();
        this.options = [];
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback(_name, _old, value) {
        // Generar opciones frescas solo al abrir (value !== null)
        if (value !== null) {
            this.options = this.generateOptions();
        }
        this.render();
    }
    get isOpen() {
        return this.hasAttribute('open');
    }
    generateOptions() {
        const options = [];
        while (options.length < CATALOG_SIZE) {
            const candidate = shuffle(createSolvedBoard());
            const key = candidate.map((t) => t.value).join(',');
            if (!options.some((o) => o.map((t) => t.value).join(',') === key)) {
                options.push(candidate);
            }
        }
        return options;
    }
    handleSelect(tiles) {
        this.dispatchEvent(new CustomEvent('puzzle-selected', {
            detail: { tiles },
            bubbles: true,
            composed: true,
        }));
        this.removeAttribute('open');
    }
    handleClose() {
        this.dispatchEvent(new CustomEvent('catalog-closed', { bubbles: true, composed: true }));
        this.removeAttribute('open');
    }
    handleRefresh() {
        this.options = this.generateOptions();
        this.render();
    }
    renderThumbnail(tiles, idx) {
        const cells = tiles
            .map((t) => t.value === 0
            ? `<div class="cell empty"></div>`
            : `<div class="cell">${t.value}</div>`)
            .join('');
        return `
      <div class="thumb" data-idx="${idx}">
        <span class="label">#${idx + 1}</span>
        <div class="mini-grid">${cells}</div>
      </div>`;
    }
    render() {
        const thumbs = this.options.map((o, i) => this.renderThumbnail(o, i)).join('');
        this.shadow.innerHTML = `
      <style>
        .overlay {
          display: ${this.isOpen ? 'flex' : 'none'};
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          align-items: center; justify-content: center;
          z-index: 200;
        }
        .card {
          background: white;
          border-radius: 12px;
          padding: 28px 32px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.3);
          max-width: 560px;
          width: 95%;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        h2 { margin: 0; font-size: 1.25rem; color: #111827; }
        .btn-close {
          background: none; border: none;
          font-size: 1.1rem; cursor: pointer;
          color: #6b7280; padding: 4px 8px;
          border-radius: 4px; line-height: 1;
        }
        .btn-close:hover { background: #f3f4f6; color: #111827; }
        .thumbs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .thumb {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          border: 2px solid transparent;
          transition: border-color 150ms, background 150ms;
        }
        .thumb:hover {
          border-color: #3b82f6;
          background: #eff6ff;
        }
        .label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #6b7280;
          letter-spacing: 0.05em;
        }
        .mini-grid {
          display: grid;
          grid-template-columns: repeat(4, 36px);
          grid-template-rows: repeat(4, 36px);
          gap: 2px;
        }
        .cell {
          width: 36px; height: 36px;
          background: #3b82f6;
          color: white;
          font-size: 0.65rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border-radius: 3px;
        }
        .cell.empty { background: #1e3a5f; }
        .footer { display: flex; justify-content: center; }
        .btn-refresh {
          padding: 8px 22px;
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 150ms;
        }
        .btn-refresh:hover { background: #e5e7eb; }
      </style>
      <div class="overlay" id="overlay">
        <div class="card">
          <div class="header">
            <h2>Elige tu puzzle</h2>
            <button class="btn-close" id="btn-close" title="Cerrar">✕</button>
          </div>
          <div class="thumbs">${thumbs}</div>
          <div class="footer">
            <button class="btn-refresh" id="btn-refresh">🔀 Nuevas opciones</button>
          </div>
        </div>
      </div>
    `;
        // Cerrar al hacer clic fuera de la card (en el overlay)
        this.shadow.getElementById('overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'overlay')
                this.handleClose();
        });
        this.shadow.getElementById('btn-close')?.addEventListener('click', () => this.handleClose());
        this.shadow.getElementById('btn-refresh')?.addEventListener('click', () => this.handleRefresh());
        this.shadow.querySelectorAll('.thumb').forEach((el, i) => {
            el.addEventListener('click', () => this.handleSelect(this.options[i]));
        });
    }
}
customElements.define('taquin-catalog', TaquinCatalog);
//# sourceMappingURL=TaquinCatalog.js.map