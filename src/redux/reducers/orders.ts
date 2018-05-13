import { Order } from '../../domain';
import { OrderAction, LOAD_OPEN, LOADED_OPEN, LOADED_CLOSED, LOAD_CLOSED } from '../actions/order';
import { EMPTY, LOADING, SUCCESS, Loadable } from './loading';
import { EXPIRED, Expirable, expireInMinute, expireInHour } from './expire';

export type OrdersState = Expirable & Loadable & {
  openOrders: Order[],
  closedOrders: Order[],
};

const initialState: OrdersState = {
  loading: EMPTY,
  openOrders: [],
  closedOrders: [],
  expires: EXPIRED,
};

const orders = (state: OrdersState = initialState, action: OrderAction) => {
  switch (action.type) {
    case LOAD_OPEN:
      return { ...state, loading: LOADING, openOrders: [] };
    case LOADED_OPEN:
      return {
        ...state, loading: SUCCESS,
        openOrders: action.payload,
        expires: expireInHour()
      };
    case LOAD_CLOSED:
      return {
        ...state, loading: LOADING,
        closedOrders: []
      };
    case LOADED_CLOSED:
      return {
        ...state, loading: SUCCESS,
        closedOrders: action.payload,
        expires: expireInHour()
      };

    default:
      return state;
  }
};

export { orders };