// import * as Redux from 'redux';
import { Dispatch, GetState } from '.';
import { Order } from '../../domain';
import { auth, getClosedOrders, getOpenOrders } from '../../services/kraken';
import { displayDanger } from './notification';

export const LOADING_OPEN = "order/loading/open";
export const LOADED_OPEN = "order/loaded/open*";
export const LOADING_CLOSED = "order/loading/closed";
export const LOADED_CLOSED = "order/loaded/closed*";

type LoadingOpen = typeof LOADING_OPEN;
type LoadedOpen = typeof LOADED_OPEN;
type LoadingClosed = typeof LOADING_CLOSED;
type LoadedClosed = typeof LOADED_CLOSED;

export type LoadingOpenAction = { type: LoadingOpen };
export type LoadingClosedAction = { type: LoadingClosed };
export type LoadedOpenAction = { type: LoadedOpen, payload: Order[] };
export type LoadedClosedAction = { type: LoadedClosed, payload: Order[] };

export type OrderAction =
  LoadingOpenAction |
  LoadedOpenAction |
  LoadingClosedAction |
  LoadedClosedAction;

export const loadedOpenOrders = (payload: Order[]): LoadedOpenAction =>
  ({ type: LOADED_OPEN, payload });

export const loadedClosedOrders = (payload: Order[]): LoadedClosedAction =>
  ({ type: LOADED_CLOSED, payload });

export const loadOpenOrdersThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    const _auth = auth(getState().settings);

    dispatch({ type: LOADING_OPEN });
    try {
      const orders = await getOpenOrders(_auth);
      dispatch(loadedOpenOrders(orders));
    } catch ({ message }) {
      dispatch(displayDanger(message));
      dispatch(loadedOpenOrders([]));
    }
  };

export const loadClosedOrdersThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    const _auth = auth(getState().settings);

    dispatch({ type: LOADING_CLOSED });
    try {
      const orders = await getClosedOrders(_auth);
      dispatch(loadedClosedOrders(orders));
    } catch ({ message }) {
      dispatch(displayDanger(message));
      dispatch(loadedClosedOrders([]));
    }
  };

export const loadOpenClosedOrdersThunk = () => async (dispatch: Dispatch) => {
  await loadOpenOrdersThunk();
  await loadClosedOrdersThunk();
};