import { Asset, TradableAssetPair } from "../../domain";
import { getAssetInfo, getTradablePairs } from '../../services/kraken';
import { Dispatch } from './index';
import { displayDanger } from './notification';

export const LOADING_STATIC = "static/loading";
export const LOADED_STATIC = "static/loaded*";
export const LOADED_STATIC_FIAT = "static/loaded/fiat*";
export const LOADED_STATIC_CRYPTO = "static/loaded/crypto*";

export type LoadingStatic = typeof LOADING_STATIC;
export type LoadedStatic = typeof LOADED_STATIC;
export type LoadedStaticFiat = typeof LOADED_STATIC_FIAT;
export type LoadedStaticCrypto = typeof LOADED_STATIC_CRYPTO;

export type StaticPayload = { assets: Asset[], tradables: TradableAssetPair[] };

export type LoadingStaticAction = { type: LoadingStatic };
export type LoadedStaticAction = { type: LoadedStatic, payload: StaticPayload };
export type LoadedStaticFiatAction = { type: LoadedStaticFiat, payload: Asset[] };
export type LoadedStaticCryptoAction = { type: LoadedStaticCrypto, payload: Asset[] };

export type StaticAction =
  | LoadingStaticAction
  | LoadedStaticAction
  | LoadedStaticFiatAction
  | LoadedStaticCryptoAction;

export const loadedStatic = (payload: StaticPayload): StaticAction =>
  ({ type: LOADED_STATIC, payload });

export const loadedStaticFiat = (payload: Asset[]): StaticAction =>
  ({ type: LOADED_STATIC_FIAT, payload });

export const loadedStaticCrypto = (payload: Asset[]): StaticAction =>
  ({ type: LOADED_STATIC_CRYPTO, payload });

export const loadStaticsThunk = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING_STATIC });
  try {
    const assets = await getAssetInfo();
    const tradables = await getTradablePairs();
    dispatch(loadedStatic({ assets, tradables }));
  } catch ({ message }) {
    dispatch(loadedStatic({ assets: [], tradables: [] }));
    dispatch(displayDanger(message));
  }
};