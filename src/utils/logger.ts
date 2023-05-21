export class Logger {
    private source: string;
  
    constructor(source: string) {
      this.source = source;
    }
  
    log(message: string): void {
      console.log(`[${this.source}] ${message}`);
    }
  
    error(message: string): void {
      console.error(`[${this.source}] ERROR: ${message}`);
    }
  }
  