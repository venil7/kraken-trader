declare module 'kraken-wrapper' {
  export type ApiBalance = {
    error: string[];
    result: {
      [symbol: string]: string
    }
  };

  export type ApiOrder = {
    refid: string | null,
    userref: number,
    status: string,
    opentm: number,
    starttm: number,
    expiretm: number,
    descr: {
      pair: string,
      type: string,
      ordertype: string,
      price: string,
      price2: string,
      leverage: string,
      order: string,
      close: string
    },
    vol: string,
    vol_exec: string,
    cost: string,
    fee: string,
    price: string,
    stopprice: string,
    limitprice: string,
    misc: string,
    oflags: string
  };

  export type ApiOrders = {
    error: string[],
    result: {
      open: {
        [symbol: string]: ApiOrder
      }
      closed: {
        [symbol: string]: ApiOrder
      }
    }
  }

  export default class KrakenWrapper {
    constructor(key: string, secret: string);
    public getBalance(): Promise<ApiBalance>;
    public getOpenOrders(params?: any): Promise<ApiOrders>;
    public getClosedOrders(params?: any): Promise<ApiOrders>;
    public getQueryOrders(params?: any): Promise<ApiOrders>;
    public getTradesHistory(params?: any): Promise<any>;
    public getQueryTrades(params?: any): Promise<any>;
    public getOpenPositions(params?: any): Promise<any>;
    public getLedgers(params?: any): Promise<any>;
    public getTradeVolume(params?: any): Promise<any>;
    public setAddOrder(params?: any): Promise<any>;
    public setCancelOrder(params?: any): Promise<any>;
  }
  // export = KrakenWrapper;
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