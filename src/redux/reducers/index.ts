import { combineReducers } from 'redux';
import { orders, OrdersState } from './orders';
import { balance, BalanceState } from './balance';
import { settings } from './settings';
import { Orders } from '../../screens';
import { Settings } from '../../services/settings';

export type GlobalState = {
  orders: OrdersState,
  balance: BalanceState,
  settings: Settings
};

const reducer = combineReducers<GlobalState>({
  orders,
  balance,
  settings
});

export { reducer };
