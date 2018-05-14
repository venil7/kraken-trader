/// <reference path="kraken-wrapper.d.ts" />
import { ApiOrder, ApiAsset, ApiTradableAssetPair, ApiTicker, ApiOHLCRow } from 'kraken-wrapper';
import { Order, Status, OrderType, Asset, TradableAssetPair, Ticker, Pair, CurrencyType, OhlcRow } from "../domain";
import { Symbol } from '../domain';

export const toOrder = (id: string, body: ApiOrder): Order => {
  const { descr } = body;
  return {
    id,
    refid: body.refid,
    userref: body.userref,
    status: body.status as Status,
    opentm: body.opentm,
    starttm: body.starttm,
    expiretm: body.expiretm,
    descr: {
      pair: descr.pair as Pair,
      type: descr.type as OrderType,
      ordertype: descr.ordertype,
      price: parseFloat(descr.price),
      price2: parseFloat(descr.price2),
      leverage: descr.leverage,
      order: descr.order,
      close: descr.close
    },
    vol: parseFloat(body.vol),
    vol_exec: parseFloat(body.vol_exec),
    cost: parseFloat(body.cost),
    fee: parseFloat(body.fee),
    price: parseFloat(body.price),
    stopprice: parseFloat(body.stopprice),
    limitprice: parseFloat(body.limitprice),
    misc: body.misc,
    oflags: body.oflags
  }
};

export const toAsset = (symbol: string, asset: ApiAsset): Asset => {
  const type = symbol.startsWith('Z') ? CurrencyType.Fiat : CurrencyType.Crypto;
  return { ...asset, symbol, type } as Asset;
};

export const toTradableAssetPair = (pair: string, assetPair: ApiTradableAssetPair): TradableAssetPair => {
  return { ...assetPair, pair } as TradableAssetPair;
};

export const toTicker = (pair: string, ticker: ApiTicker): Ticker => {
  const [ask] = ticker.a;
  const [bid] = ticker.b;
  const [last] = ticker.c;
  const [volume] = ticker.v;
  const [volumeWeightedAverage] = ticker.p;
  const [numberOfTrades] = ticker.t;
  const [low] = ticker.l;
  const [high] = ticker.h;
  const [opening] = ticker.o;
  return {
    pair: <Pair>pair,
    ask,
    bid,
    last,
    volume,
    volumeWeightedAverage,
    numberOfTrades,
    low,
    high,
    opening,
  };
};

export const toOhlcRow = (pair: string, row: ApiOHLCRow): OhlcRow => {
  const [time, open, high, low, close, vwap, volume, count] = row;
  return {
    pair: pair as Pair,
    time,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
    vwap: parseFloat(vwap),
    volume: parseFloat(volume),
    count,
  };
};

export const symbolToName = (symbol: Symbol): string => {
  switch (symbol) {
    case Symbol.XBT: return 'XBT - Bitcoin';
    case Symbol.LTC: return 'LTC - Litecoin';
    case Symbol.XDG: return 'XDG - Dogecoin';
    case Symbol.REP: return 'REP - Augur';
    case Symbol.XRP: return 'XRP - Ripple ';
    case Symbol.XLM: return 'XLM - Stellar';
    case Symbol.ETH: return 'ETH - Ether';
    case Symbol.ETC: return 'ETC - Ether Classic';
    case Symbol.ICN: return 'ICN - Iconomi';
    case Symbol.USDT: return 'USDT - Tether';
    case Symbol.DASH: return 'DASH - Dash';
    case Symbol.ZEC: return 'ZEC - Zcash';
    case Symbol.XMR: return 'XMR - Monero';
    case Symbol.GNO: return 'GNO - Gnosis';
    case Symbol.EOS: return 'EOS - Eos';
    case Symbol.GBP: return 'BCH - Bitcoin Cash';
    case Symbol.EUR: return 'EUR - Euro';
    case Symbol.JPY: return 'USD - US Dollar';
    case Symbol.USD: return 'JPY  - Japanese Yen';
    case Symbol.CAD: return 'CAD - Canadian Dollar';
    default: return symbol.toString();
  }
}