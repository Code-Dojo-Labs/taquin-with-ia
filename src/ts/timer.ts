export class Timer {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private startTime = 0;
  private accumulated = 0;

  start(): void {
    if (this.intervalId !== null) return;
    this.startTime = Date.now();
    this.intervalId = setInterval(() => {
      // El tiempo transcurrido se calcula en elapsed()
    }, 500);
  }

  pause(): void {
    if (this.intervalId === null) return;
    this.accumulated += Date.now() - this.startTime;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resume(): void {
    if (this.intervalId !== null) return;
    this.startTime = Date.now();
    this.intervalId = setInterval(() => {}, 500);
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.accumulated = 0;
  }

  elapsed(): number {
    const running = this.intervalId !== null ? Date.now() - this.startTime : 0;
    return this.accumulated + running;
  }

  /** Formatea milisegundos como "MM:SS" */
  static format(ms: number): string {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
}
