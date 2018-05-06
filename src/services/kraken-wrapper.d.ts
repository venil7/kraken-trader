declare module 'kraken-wrapper' {
  type ApiBalance = {
    error: string[];
    result: {
      [symbol: string]: string
    }
  };

  class KrakenWrapper {
    constructor(key: string, secret: string);
    public getBalance(): Promise<ApiBalance>;
  }
  export = KrakenWrapper;
}

declare module 'rn-async-storage' {
  class AsyncStorage {
    static getItem: (s: string) => Promise<string>,
    static setItem: (s: string, v: string) => Promise<void>,
    static getAllKeys: () => Promise<string[]>,
    static clear: () => Promise<void>
  }
  export = AsyncStorage;
}