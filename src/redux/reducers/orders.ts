import { Order } from '../../domain';
import { OrderAction, LOAD_OPEN, LOADED_OPEN, LOADED_CLOSED, LOAD_CLOSED } from '../actions/order';
import { LoadingState, EMPTY, LOADING, SUCCESS } from './loading';

export type OrdersState = {
  loading: LoadingState,
  openOrders: Order[],
  closedOrders: Order[],
};

const initialState: OrdersState = {
  loading: EMPTY,
  openOrders: [],
  closedOrders: []
}

const orders = (state: OrdersState = initialState, action: OrderAction) => {
  switch (action.type) {
    case LOAD_OPEN:
      return { ...state, loading: LOADING, openOrders: [] };
    case LOADED_OPEN:
      return { ...state, loading: SUCCESS, openOrders: action.payload };
    case LOAD_CLOSED:
      return { ...state, loading: LOADING, closedOrders: [] };
    case LOADED_CLOSED:
      return { ...state, loading: SUCCESS, closedOrders: action.payload };

    default:
      return state;
  }
};

export { orders };