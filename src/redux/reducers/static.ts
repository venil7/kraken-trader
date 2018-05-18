import { LoadingState, EMPTY, LOADING, SUCCESS, Loadable } from './loading';
import { EXPIRED, Expirable, expireInMinute, expireInDays } from './expire';
import { Asset, TradableAssetPair, CurrencyType } from '../../domain';
import { StaticAction, LOAD_STATIC, LOADED_STATIC, LOADED_STATIC_FIAT, LOADED_STATIC_CRYPTO } from '../actions/static';
import { pairToSymbols } from '../../services/convert';

export type StaticState = Expirable & Loadable & {
  cryptos: Asset[],
  fiats: Asset[],
  tradables: TradableAssetPair[]
};

const initialState: StaticState = {
  loading: EMPTY,
  expires: EXPIRED,
  cryptos: [],
  fiats: [],
  tradables: [],
};

export const statics = (state: StaticState = initialState, action: StaticAction) => {
  switch (action.type) {
    case LOAD_STATIC: {
      return {
        ...state,
        loading: LOADING
      };
    }
    case LOADED_STATIC: {
      const { assets, tradables } = action.payload;
      const fiats = assets.filter(a => a.type === CurrencyType.Fiat);
      const cryptos = assets.filter(a => a.type === CurrencyType.Crypto);
      return {
        ...state,
        loading: SUCCESS,
        fiats, cryptos, tradables,
        expires: expireInDays(30)
      }
    }
    case LOADED_STATIC_FIAT: {
      return { ...state, fiats: action.payload };
    }
    case LOADED_STATIC_CRYPTO: {
      return { ...state, cryptos: action.payload };
    }
    default:
      return state;
  }
};