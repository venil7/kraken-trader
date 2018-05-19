declare module 'kraken-wrapper' {
  export type ApiError = { error: string[] };
  export type ApiBalance = ApiError & {
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

  export type ApiOrders = ApiError & {
    result: {
      open: {
        [symbol: string]: ApiOrder
      }
      closed: {
        [symbol: string]: ApiOrder
      }
    }
  }

  export type ApiAsset = {
    aclass: string;
    altname: string;
    decimals: number;
    display_decimals: number;
  };
  export type ApiAssets = ApiError & {
    result: {
      [symbol: string]: ApiAsset
    }
  };
  export type ApiTradableAssetPair = {
    altname: string;
    aclass_base: string;
    base: string;
    aclass_quote: string;
    quote: string;
    lot: string;
    pair_decimals: number;
    lot_decimals: number;
    lot_multiplier: number;
    leverage_buy: any[];
    leverage_sell: any[];
    fees: [number, number][];
    fees_maker: [number, number][];
    fee_volume_currency: string;
    margin_call: number;
    margin_stop: number;
  };
  export type ApiTradableAssetPairs = ApiError & {
    result: {
      [symbol: string]: ApiTradableAssetPair
    }
  };

  export type ApiTicker = {
    a: [string, string, string];
    b: [string, string, string];
    c: [string, string];
    v: [string, string];
    p: [string, string];
    t: [string, string];
    l: [string, string];
    h: [string, string];
    o: [string, string];
  };

  export type ApiTickerInformation = ApiError & {
    result: {
      [symbol: string]: ApiTicker
    }
  };
  export type ApiOHLCRow = [number, string, string, string, string, string, string, number];
  export type ApiOHLCData = ApiError & {
    result: {
      [symbol: string]: ApiOHLCRow
    }
  };

  export default class KrakenWrapper {
    constructor(key: string, secret: string);
    //public
    public getAssetInfo(params?: any): Promise<ApiAssets>;
    public getTradableAssetPairs(params?: any): Promise<ApiTradableAssetPairs>;
    public getTickerInformation(params: { pair: string }): Promise<ApiTickerInformation>;
    public getOHLC(params: { pair: string, interval: number }): Promise<ApiOHLCData>
    //private
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
}

declare module 'rn-async-storage' {
  class AsyncStorage {
    static getItem: (s: string) => Promise<string>;
    static setItem: (s: string, v: string) => Promise<void>;
    static getAllKeys: () => Promise<string[]>;
    static clear: () => Promise<void>;
  }
  export = AsyncStorage;
}