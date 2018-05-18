import { TradableAssetPair, Asset } from "../../domain";
import { getAssetInfo, getTradablePairs } from '../../services/kraken';
import { displayDanger } from './notification';
import { Dispatch } from './index';

export const LOAD_STATIC = "static/load";
export const LOADED_STATIC = "static/loaded";
export const LOADED_STATIC_FIAT = "static/loaded/fiat";
export const LOADED_STATIC_CRYPTO = "static/loaded/crypto";

export type LoadStatic = typeof LOAD_STATIC;
export type LoadedStatic = typeof LOADED_STATIC;
export type LoadedStaticFiat = typeof LOADED_STATIC_FIAT;
export type LoadedStaticCrypto = typeof LOADED_STATIC_CRYPTO;

export type StaticPayload = { assets: Asset[], tradables: TradableAssetPair[] };

export type LoadStaticAction = { type: LoadStatic };
export type LoadedStaticAction = { type: LoadedStatic, payload: StaticPayload };
export type LoadedStaticFiatAction = { type: LoadedStaticFiat, payload: Asset[] };
export type LoadedStaticCryptoAction = { type: LoadedStaticCrypto, payload: Asset[] };

export type StaticAction =
  | LoadStaticAction
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
  dispatch({ type: LOAD_STATIC });
  try {
    const assets = await getAssetInfo();
    const tradables = await getTradablePairs();
    dispatch(loadedStatic({ assets, tradables }));
  } catch ({ message }) {
    dispatch(loadedStatic({ assets: [], tradables: [] }));
    dispatch(displayDanger(message));
  }
};