export {};

declare global {
  interface Window {
    actionSpeak: {
      showToast: (...args: any[]) => Promise<void>;
      showBasicPopup: (...args: any[]) => Promise<void>;
      showMacWindowPopup: (...args: any[]) => Promise<void>;
      imageFetch: () => Promise<void>;
    };
  }
}
