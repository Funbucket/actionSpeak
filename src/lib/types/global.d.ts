export {};

declare global {
  interface Window {
    actionSpeak: {
      push: (...args: any[]) => Promise<void>;
      imageFetch: () => Promise<void>;
    };
  }
}
