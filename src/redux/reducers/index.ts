import { combineReducers } from 'redux';
import { balance, BalanceState } from './balance';
import { errors, ErrorState } from './error';
import { orders, OrdersState } from './orders';
import { settings, SettingsState } from './settings';
import { statics, StaticState } from './static';
import { ticker, TickerState } from './ticker';

export type GlobalState = {
  settings: SettingsState,
  balance: BalanceState,
  statics: StaticState,
  orders: OrdersState,
  ticker: TickerState,
  errors: ErrorState,
};

export const reducer = combineReducers<GlobalState>({
  settings,
  balance,
  statics,
  orders,
  ticker,
  errors,
});
