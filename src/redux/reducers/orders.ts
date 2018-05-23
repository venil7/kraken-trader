import { Order } from '../../domain';
import { LOADED_CLOSED, LOADED_OPEN, LOADING_CLOSED, LOADING_OPEN, OrderAction } from '../actions/order';
import { EXPIRED, Expirable, expireInHour } from './expire';
import { Loadable, LoadingState } from './loading';

export type OrdersState = Expirable & Loadable & {
  openOrders: Order[],
  closedOrders: Order[],
};

const initialState: OrdersState = {
  loading: LoadingState.Empty,
  openOrders: [],
  closedOrders: [],
  expires: EXPIRED,
};

const orders = (state: OrdersState = initialState, action: OrderAction) => {
  switch (action.type) {
    case LOADING_OPEN:
      return { ...state, loading: LoadingState.Loading, openOrders: [] };
    case LOADED_OPEN:
      return {
        ...state,
        loading: LoadingState.Success,
        openOrders: action.payload,
        expires: expireInHour()
      };
    case LOADING_CLOSED:
      return {
        ...state,
        loading: LoadingState.Loading,
        closedOrders: []
      };
    case LOADED_CLOSED:
      return {
        ...state,
        loading: LoadingState.Success,
        closedOrders: action.payload,
        expires: expireInHour()
      };

    default:
      return state;
  }
};

export { orders };