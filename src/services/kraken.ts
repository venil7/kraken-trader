/// <reference path="kraken-wrapper.d.ts" />
import KrakenAPI, { ApiOrder } from 'kraken-wrapper';
import { Balance, Order } from '../domain';
import { SettingsState } from '../redux/reducers/settings';
import { toOrder } from './convert';

export type Auth = {
  key: string,
  secret: string,
  cred: boolean,
};

export const auth = ({ key, secret }: SettingsState) => (<Auth>{
  key,
  secret,
  cred: (!!key && !!secret)
});

let key = '';
let secret = '';
let krakenIntance: KrakenAPI = new KrakenAPI(key, secret);

const throwOnError = ([error]: string[]) => {
  if (error) {
    throw new Error(error);
  }
};

const instance = (auth: Auth): KrakenAPI => {
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
  const balances = Object
    .entries(result)
    .map(([symbol, balance]: string[]) =>
      (<Balance>{ symbol, balance: parseFloat(balance) })
    );
  return balances;
};

type ApiOrderEntry = [string, ApiOrder];
const getOpenOrders = async (auth: Auth): Promise<Order[]> => {
  const { result: { open = {} }, error } = await instance(auth).getOpenOrders();
  throwOnError(error);
  const orders = Object
    .entries(open)
    .map(([id, body]: ApiOrderEntry) => toOrder(id, body));
  return orders;
};

const getClosedOrders = async (auth: Auth): Promise<Order[]> => {
  const { result: { closed = {} }, error } = await instance(auth).getClosedOrders();
  throwOnError(error);
  const orders = Object
    .entries(closed)
    .map(([id, body]: ApiOrderEntry) => toOrder(id, body));
  return orders;
};

export {
  getBalance,
  getOpenOrders,
  getClosedOrders,
};