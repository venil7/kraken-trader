import { LoadingState, EMPTY, LOADING, SUCCESS, Loadable } from './loading';
import { EXPIRED, Expirable, expireInMinute, expireInDays } from './expire';
import { Asset, TradableAssetPair, CurrencyType } from '../../domain';
import { StaticAction, LOAD_STATIC, LOADED_STATIC } from '../actions/static';
import { LOADED } from '../actions/balance';

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

export const staticData = (state: StaticState = initialState, action: StaticAction) => {
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
        ...state, loading: LOADED,
        fiats, cryptos, tradables,
        expire: expireInDays(30)
      }
    }
    default:
      return state;
  }
};