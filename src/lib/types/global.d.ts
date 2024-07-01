export {};

declare global {
  interface Window {
    actionSpeak: {
      push: (...args: any[]) => Promise<void>;
      triggerImageFetch: () => Promise<void>;
    };
  }
}
