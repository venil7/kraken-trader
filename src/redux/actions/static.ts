import * as Redux from 'redux';
import { TradableAssetPair, Asset } from "../../domain";
import { getAssetInfo, getTradablePairs } from '../../services/kraken';
import { displayDanger } from './notification';

export const LOAD_STATIC = "static/load";
export const LOADED_STATIC = "static/loaded";

export type LoadStatic = typeof LOAD_STATIC;
export type LoadedStatic = typeof LOADED_STATIC;

export type StaticPayload = { assets: Asset[], tradables: TradableAssetPair[] };

export type LoadStaticAction = { type: LoadStatic };
export type LoadedStaticAction = { type: LoadedStatic, payload: StaticPayload };

export type StaticAction =
  | LoadStaticAction
  | LoadedStaticAction;

export type StaticDispatch = Redux.Dispatch<StaticAction, any>;

export const loadedStatic = (payload: StaticPayload): LoadedStaticAction =>
  ({ type: LOADED_STATIC, payload });

export const loadStaticThunk = () => async (dispatch: StaticDispatch) => {
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