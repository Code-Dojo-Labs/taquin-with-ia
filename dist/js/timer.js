export class Timer {
    constructor() {
        this.intervalId = null;
        this.startTime = 0;
        this.accumulated = 0;
    }
    start() {
        if (this.intervalId !== null)
            return;
        this.startTime = Date.now();
        this.intervalId = setInterval(() => {
            // El tiempo transcurrido se calcula en elapsed()
        }, 500);
    }
    pause() {
        if (this.intervalId === null)
            return;
        this.accumulated += Date.now() - this.startTime;
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    resume() {
        if (this.intervalId !== null)
            return;
        this.startTime = Date.now();
        this.intervalId = setInterval(() => { }, 500);
    }
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.accumulated = 0;
    }
    elapsed() {
        const running = this.intervalId !== null ? Date.now() - this.startTime : 0;
        return this.accumulated + running;
    }
    /** Formatea milisegundos como "MM:SS" */
    static format(ms) {
        const totalSecs = Math.floor(ms / 1000);
        const mins = Math.floor(totalSecs / 60)
            .toString()
            .padStart(2, '0');
        const secs = (totalSecs % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }
}
//# sourceMappingURL=timer.js.map