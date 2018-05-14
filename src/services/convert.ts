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
};

export const PairToSymbols = (pair: Pair): [Symbol, Symbol] => {
  switch (pair) {
    case Pair.BCH_USD: return [Symbol.BCH, Symbol.USD];
    case Pair.BCH_XBT: return [Symbol.BCH, Symbol.XBT];
    case Pair.DASH_EUR: return [Symbol.DASH, Symbol.EUR];
    case Pair.DASH_USD: return [Symbol.DASH, Symbol.USD];
    case Pair.DASH_XBT: return [Symbol.DASH, Symbol.XBT];
    case Pair.EOS_ETH: return [Symbol.EOS, Symbol.ETH];
    case Pair.EOS_EUR: return [Symbol.EOS, Symbol.EUR];
    case Pair.EOS_USD: return [Symbol.EOS, Symbol.USD];
    case Pair.EOS_XBT: return [Symbol.EOS, Symbol.XBT];
    case Pair.GNO_ETH: return [Symbol.GNO, Symbol.ETH];
    case Pair.GNO_EUR: return [Symbol.GNO, Symbol.EUR];
    case Pair.GNO_USD: return [Symbol.GNO, Symbol.USD];
    case Pair.GNO_XBT: return [Symbol.GNO, Symbol.XBT];
    case Pair.USDT_USD: return [Symbol.USDT, Symbol.USD];
    case Pair.ETC_ETH: return [Symbol.ETC, Symbol.ETH];
    case Pair.ETC_XBT: return [Symbol.ETC, Symbol.XBT];
    case Pair.ETC_EUR: return [Symbol.ETC, Symbol.EUR];
    case Pair.ETC_USD: return [Symbol.ETC, Symbol.USD];
    case Pair.ETH_XBT: return [Symbol.ETH, Symbol.XBT];
    case Pair.ETH_XBT_d: return [Symbol.ETH, Symbol.XBT];
    case Pair.ETH_CAD: return [Symbol.ETH, Symbol.CAD];
    case Pair.ETH_CAD_d: return [Symbol.ETH, Symbol.CAD];
    case Pair.ETH_EUR: return [Symbol.ETH, Symbol.EUR];
    case Pair.ETH_EUR_d: return [Symbol.ETH, Symbol.EUR];
    case Pair.ETH_GBP: return [Symbol.ETH, Symbol.GBP];
    case Pair.ETH_GBP_d: return [Symbol.ETH, Symbol.GBP];
    case Pair.ETH_JPY: return [Symbol.ETH, Symbol.JPY];
    case Pair.ETH_JPY_d: return [Symbol.ETH, Symbol.JPY];
    case Pair.ETH_USD: return [Symbol.ETH, Symbol.USD];
    case Pair.ETH_USD_d: return [Symbol.ETH, Symbol.USD];
    case Pair.ICN_ETH: return [Symbol.ICN, Symbol.ETH];
    case Pair.ICN_XBT: return [Symbol.ICN, Symbol.XBT];
    case Pair.LTC_XBT: return [Symbol.LTC, Symbol.XBT];
    case Pair.LTC_EUR: return [Symbol.LTC, Symbol.EUR];
    case Pair.LTC_USD: return [Symbol.LTC, Symbol.USD];
    case Pair.MLN_ETH: return [Symbol.MLN, Symbol.ETH];
    case Pair.MLN_XBT: return [Symbol.MLN, Symbol.XBT];
    case Pair.REP_ETH: return [Symbol.REP, Symbol.ETH];
    case Pair.REP_XBT: return [Symbol.REP, Symbol.XBT];
    case Pair.REP_EUR: return [Symbol.REP, Symbol.EUR];
    case Pair.REP_USD: return [Symbol.REP, Symbol.USD];
    case Pair.XBT_CAD: return [Symbol.XBT, Symbol.CAD];
    case Pair.XBT_CAD_d: return [Symbol.XBT, Symbol.CAD];
    case Pair.XBT_EUR: return [Symbol.XBT, Symbol.EUR];
    case Pair.XBT_EUR_d: return [Symbol.XBT, Symbol.EUR];
    case Pair.XBT_GBP: return [Symbol.XBT, Symbol.GBP];
    case Pair.XBT_GBP_d: return [Symbol.XBT, Symbol.GBP];
    case Pair.XBT_JPY: return [Symbol.XBT, Symbol.JPY];
    case Pair.XBT_JPY_d: return [Symbol.XBT, Symbol.JPY];
    case Pair.XBT_USD: return [Symbol.XBT, Symbol.USD];
    case Pair.XBT_USD_d: return [Symbol.XBT, Symbol.USD];
    case Pair.XDG_XBT: return [Symbol.XDG, Symbol.XBT];
    case Pair.XLM_XBT: return [Symbol.XLM, Symbol.XBT];
    case Pair.XLM_EUR: return [Symbol.XLM, Symbol.EUR];
    case Pair.XLM_USD: return [Symbol.XLM, Symbol.USD];
    case Pair.XMR_XBT: return [Symbol.XMR, Symbol.XBT];
    case Pair.XMR_EUR: return [Symbol.XMR, Symbol.EUR];
    case Pair.XMR_USD: return [Symbol.XMR, Symbol.USD];
    case Pair.XRP_XBT: return [Symbol.XRP, Symbol.XBT];
    case Pair.XRP_CAD: return [Symbol.XRP, Symbol.CAD];
    case Pair.XRP_EUR: return [Symbol.XRP, Symbol.EUR];
    case Pair.XRP_JPY: return [Symbol.XRP, Symbol.JPY];
    case Pair.XRP_USD: return [Symbol.XRP, Symbol.USD];
    case Pair.ZEC_XBT: return [Symbol.ZEC, Symbol.XBT];
    case Pair.ZEC_EUR: return [Symbol.ZEC, Symbol.EUR];
    case Pair.ZEC_JPY: return [Symbol.ZEC, Symbol.JPY];
    case Pair.ZEC_USD: return [Symbol.ZEC, Symbol.USD];
    default: return [Symbol.XBT, Symbol.USD];
  }
};