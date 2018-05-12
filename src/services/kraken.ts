/// <reference path="kraken-wrapper.d.ts" />
import KrakenAPI, { ApiOrder, ApiAsset, ApiTicker, ApiOHLCRow, ApiTradableAssetPair } from 'kraken-wrapper';
import { Balance, Order, Asset, Ticker, Pair, Interval, TradableAssetPair } from '../domain';
import { toOrder, toAsset, toTicker, toOhlcRow, toTradableAssetPair } from './convert';

type Obj = { entries: (o: any) => [string, any][] };
const obj: Obj = Object;
const { entries } = obj;

export type Auth = {
  key: string,
  secret: string,
  cred: boolean,
};
export type Authable = { key: string, secret: string };
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
  const balances = entries(result)
    .map(([symbol, balance]: string[]) =>
      (<Balance>{ symbol, balance: parseFloat(balance) })
    );
  return balances;
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
const getTickerInfo = async (pairs: Pair[]): Promise<Ticker[]> => {
  const params = { pair: pairs.map(p => p.toString()).join(',') };
  const { result, error } = await instance().getTickerInformation(params);
  throwOnError(error);
  const tickers = entries(result).map(([pair, ticker]: ApiTickerEntry) => toTicker(pair, ticker));
  return tickers;
};

type ApiOHLCEntry = [string, ApiOHLCRow];
const getOHLC = async (pair: Pair, interval: Interval = Interval.Minute): Promise<OHLC> => {
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