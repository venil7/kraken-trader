import { Asset, CurrencyType, TradableAssetPair } from '../../domain';
import { LOADED_STATIC, LOADED_STATIC_CRYPTO, LOADED_STATIC_FIAT, LOAD_STATIC, StaticAction } from '../actions/static';
import { EXPIRED, Expirable, expireInDays } from './expire';
import { Loadable, LoadingState } from './loading';

export type StaticState = Expirable & Loadable & {
  cryptos: Asset[],
  fiats: Asset[],
  tradables: TradableAssetPair[]
};

const initialState: StaticState = {
  loading: LoadingState.Empty,
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
        loading: LoadingState.Loading
      };
    }
    case LOADED_STATIC: {
      const { assets, tradables } = action.payload;
      const fiats = assets.filter(a => a.type === CurrencyType.Fiat);
      const cryptos = assets.filter(a => a.type === CurrencyType.Crypto);
      return {
        ...state,
        loading: LoadingState.Success,
        fiats, cryptos, tradables,
        expires: expireInDays(1)
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