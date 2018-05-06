/// <reference path="kraken-wrapper.d.ts" />
import KrakenAPI from 'kraken-wrapper';
import { Balance } from '../domain';
import { SettingsState } from '../redux/reducers/settings';

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
  if (!auth.cred) return [];
  const { result } = await instance(auth).getBalance();
  const balances = Object.entries(result).map(([symbol, balance]: string[]) =>
    (<Balance>{ symbol, balance: parseFloat(balance) })
  );
  return balances;
};

export {
  getBalance
};