import { combineReducers } from 'redux';
import { BalanceState, balance } from './balance';
import { OrdersState, orders } from './orders';
import { SettingsState, settings } from './settings';
import { StaticState, statics } from './static';
import { TickerState, ticker } from './ticker';

export type GlobalState = {
  orders: OrdersState,
  balance: BalanceState,
  settings: SettingsState,
  statics: StaticState,
  ticker: TickerState,
};

export const reducer = combineReducers<GlobalState>({
  settings,
  balance,
  statics,
  orders,
  ticker,
});
