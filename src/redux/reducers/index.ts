import { combineReducers } from 'redux';
import { orders, OrdersState } from './orders';
import { balance, BalanceState } from './balance';
import { settings, SettingsState } from './settings';
import { statics, StaticState } from './static';

export type GlobalState = {
  orders: OrdersState,
  balance: BalanceState,
  settings: SettingsState,
  statics: StaticState,
};

export const reducer = combineReducers<GlobalState>({
  orders,
  balance,
  settings,
  statics
});
