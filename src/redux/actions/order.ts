import { Dispatch, GetState } from '.';
import { Order } from '../../domain';
import { auth, getClosedOrders, getOpenOrders } from '../../services/kraken';
import { addError } from './error';
import { displayDanger } from './notification';

export const LOADING_OPEN_ORDERS = "order/loading/open";
export const LOADED_OPEN_ORDERS = "order/loaded/open*";
export const LOADING_CLOSED_ORDERS = "order/loading/closed";
export const LOADED_CLOSED_ORDERS = "order/loaded/closed*";
export const CANCELLING_ORDER = "order/cancelling";
export const CANCELLED_ORDER = "order/cancelled";

type LoadingOpenOrders = typeof LOADING_OPEN_ORDERS;
type LoadedOpenOrders = typeof LOADED_OPEN_ORDERS;
type LoadingClosedOrders = typeof LOADING_CLOSED_ORDERS;
type LoadedClosedOrders = typeof LOADED_CLOSED_ORDERS;
type CancellingOrder = typeof CANCELLING_ORDER;
type CancelledOrder = typeof CANCELLED_ORDER;

export type LoadingOpenAction = { type: LoadingOpenOrders };
export type LoadingClosedAction = { type: LoadingClosedOrders };
export type LoadedOpenAction = { type: LoadedOpenOrders, payload: Order[] };
export type LoadedClosedAction = { type: LoadedClosedOrders, payload: Order[] };
export type CancellingOrderAction = { type: CancellingOrder, payload: string };

export type OrderAction =
  LoadingOpenAction |
  LoadedOpenAction |
  LoadingClosedAction |
  LoadedClosedAction;

export const loadedOpenOrders = (payload: Order[]): LoadedOpenAction =>
  ({ type: LOADED_OPEN_ORDERS, payload });

export const loadedClosedOrders = (payload: Order[]): LoadedClosedAction =>
  ({ type: LOADED_CLOSED_ORDERS, payload });

export const loadOpenOrdersThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    const _auth = auth(getState().settings);

    dispatch({ type: LOADING_OPEN_ORDERS });
    try {
      const orders = await getOpenOrders(_auth);
      dispatch(loadedOpenOrders(orders));
    } catch (error) {
      dispatch(addError(error));
      dispatch(displayDanger(error.message));
      dispatch(loadedOpenOrders([]));
    }
  };

export const loadClosedOrdersThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    const _auth = auth(getState().settings);

    dispatch({ type: LOADING_CLOSED_ORDERS });
    try {
      const orders = await getClosedOrders(_auth);
      dispatch(loadedClosedOrders(orders));
    } catch (error) {
      dispatch(addError(error));
      dispatch(displayDanger(error.message));
      dispatch(loadedClosedOrders([]));
    }
  };

export const loadOpenClosedOrdersThunk = () => async (dispatch: Dispatch) => {
  await loadOpenOrdersThunk();
  await loadClosedOrdersThunk();
};