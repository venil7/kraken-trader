/// <reference path="kraken-wrapper.d.ts" />
import KrakenAPI, { ApiAsset, ApiOHLCRow, ApiOrder, ApiTicker, ApiTradableAssetPair } from 'kraken-wrapper';
import { Asset, Balance, Interval, OhlcRow, Order, Pair, Symbol, Ticker, TradableAssetPair } from '../domain';
import { toAsset, toBalance, toOhlcRow, toOrder, toPairs, toTicker, toTradableAssetPair } from './convert';

type Obj = { entries: (o: any) => [string, any][] };
const obj: Obj = Object;
const { entries } = obj;

export type Authable = { key: string, secret: string };
export type Auth = Authable & { cred: boolean };

export const auth = ({ key, secret }: Authable) => (<Auth>{
  key,
  secret,
  cred: (!!key && !!secret)
});

const key = '';
const secret = '';
const defaultAuth = auth({ key, secret });
let krakenIntance: KrakenAPI = new KrakenAPI(key, secret);

const throwOnError = ([error]: string[]) => {
  if (error) {
    throw new Error(error);
  }
};

const instance = (auth: Auth = defaultAuth): KrakenAPI => {
  if (!!instance) {
    if (key !== auth.key || secret !== auth.secret) {
      krakenIntance = new KrakenAPI(auth.key, auth.secret);
    }
    return krakenIntance;
  }
  krakenIntance = new KrakenAPI(auth.key, auth.secret);
  return krakenIntance;
};

const getBalance = async (auth: Auth): Promise<Balance[]> => {
  const { result = {}, error } = await instance(auth).getBalance();
  throwOnError(error);
  return entries(result)
    .map(([symbol, balance]: string[]) => toBalance(symbol, balance));
};

type ApiOrderEntry = [string, ApiOrder];
const getOpenOrders = async (auth: Auth): Promise<Order[]> => {
  const { result: { open = {} }, error } = await instance(auth).getOpenOrders();
  throwOnError(error);
  const orders = entries(open).map(([id, body]: ApiOrderEntry) => toOrder(id, body));
  return orders;
};

const getClosedOrders = async (auth: Auth): Promise<Order[]> => {
  const { result: { closed = {} }, error } = await instance(auth).getClosedOrders();
  throwOnError(error);
  const orders = entries(closed).map(([id, body]: ApiOrderEntry) => toOrder(id, body));
  return orders;
};

type ApiAssetEntry = [string, ApiAsset];
const getAssetInfo = async (): Promise<Asset[]> => {
  const { result, error } = await instance().getAssetInfo();
  throwOnError(error);
  const assets = entries(result).map(([symbol, asset]: ApiAssetEntry) => toAsset(symbol, asset));
  return assets;
};

type ApiTickerEntry = [string, ApiTicker];
const getTickerInfo = async (quote: Symbol, symbols: Symbol[]): Promise<Ticker[]> => {
  const pairs = toPairs(quote, symbols);
  if (!pairs.length) return [];
  const params = { pair: pairs.map(p => p.toString()).join(',') };
  const { result, error } = await instance().getTickerInformation(params);
  throwOnError(error);
  const tickers = entries(result)
    .map(([pairName, ticker]: ApiTickerEntry) => toTicker(pairName, quote, ticker));
  return tickers;
};

type ApiOHLCEntry = [string, ApiOHLCRow];
const getOHLC = async (pair: Pair, interval: Interval = Interval.Minute): Promise<OhlcRow[]> => {
  const params = { pair, interval };
  const { result, error } = await instance().getOHLC(params);
  throwOnError(error);
  const ohlc = entries(result).map(([pair, row]: ApiOHLCEntry) => toOhlcRow(pair, row));
  return ohlc;
};

type ApiTradableAssetPairEntry = [string, ApiTradableAssetPair];
const getTradablePairs = async (): Promise<TradableAssetPair[]> => {
  const { result, error } = await instance().getTradableAssetPairs();
  throwOnError(error);
  const tradables = entries(result).map(([pair, assetPair]: ApiTradableAssetPairEntry) =>
    toTradableAssetPair(pair, assetPair)
  );
  return tradables;
};

export {
  getBalance,
  getOpenOrders,
  getClosedOrders,
  getAssetInfo,
  getTickerInfo,
  getOHLC,
  getTradablePairs
};