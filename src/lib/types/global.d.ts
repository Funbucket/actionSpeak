export {};

declare global {
  interface Window {
    actionSpeak: {
      showToast: (...args: any[]) => Promise<void>;
      showPopup: (...args: any[]) => Promise<void>;
      imageFetch: () => Promise<void>;
    };
  }
}
