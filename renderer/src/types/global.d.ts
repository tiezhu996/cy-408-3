declare global {
  interface Window {
    referralAPI: {
      invoke<T = unknown>(channel: string, payload?: unknown): Promise<T>;
      on(channel: string, listener: (...args: unknown[]) => void): void;
      off(channel: string, listener: (...args: unknown[]) => void): void;
    };
  }
}

export {};
