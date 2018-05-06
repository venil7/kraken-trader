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
