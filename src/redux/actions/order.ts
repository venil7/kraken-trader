import * as Redux from 'redux';
import { getOpenOrders, getClosedOrders } from '../../services/kraken';
import { Order } from '../../domain';
import { Auth } from '../../services/kraken';
import { displayDanger } from './notification';

export const LOAD_OPEN = "order/load/open";
export const LOADED_OPEN = "order/loaded/open";
export const LOAD_CLOSED = "order/load/closed";
export const LOADED_CLOSED = "order/loaded/closed";

type LoadOpen = typeof LOAD_OPEN;
type LoadedOpen = typeof LOADED_OPEN;
type LoadClosed = typeof LOAD_CLOSED;
type LoadedClosed = typeof LOADED_CLOSED;

export type LoadOpenAction = { type: LoadOpen };
export type LoadClosedAction = { type: LoadClosed };
export type LoadedOpenAction = { type: LoadedOpen, payload: Order[] };
export type LoadedClosedAction = { type: LoadedClosed, payload: Order[] };

export type OrderAction =
  LoadOpenAction |
  LoadedOpenAction |
  LoadClosedAction |
  LoadedClosedAction;

type Dispatch = Redux.Dispatch<OrderAction, any>;

export const queryOpenOrdersThunk = (auth: Auth) => async (dispatch: Dispatch) => {
  dispatch({ type: LOAD_OPEN });
  try {
    const orders = await getOpenOrders(auth);
    dispatch({ type: LOADED_OPEN, payload: orders });
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch({ type: LOADED_OPEN, payload: [] });
  }
};

export const queryClosedOrdersThunk = (auth: Auth) => async (dispatch: Dispatch) => {
  dispatch({ type: LOAD_CLOSED });
  try {
    const orders = await getClosedOrders(auth);
    dispatch({ type: LOADED_CLOSED, payload: orders });
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch({ type: LOADED_CLOSED, payload: [] });
  }
};