import { combineReducers } from 'redux';
import { orders, OrdersState } from './orders';
import { balance, BalanceState } from './balance';
import { settings, Settings } from './settings';

export type GlobalState = {
  orders: OrdersState,
  balance: BalanceState,
  settings: Settings
};

export const reducer = combineReducers<GlobalState>({
  orders,
  balance,
  settings
});
