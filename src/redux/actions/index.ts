import * as Redux from 'redux';
import { GlobalState } from '../reducers';
import * as balance from './balance';
import * as error from './error';
import * as notification from './notification';
import * as order from './order';
import * as settings from './settings';
import * as statics from './static';
import * as ticker from './ticker';

export type DispatchableAction =
  | notification.NotificationAction
  | settings.SettingsAction
  | balance.BalanceAction
  | statics.StaticAction
  | ticker.TickerAction
  | order.OrderAction
  | error.ErrorAction;

export type Dispatch = Redux.Dispatch<DispatchableAction, any>;
export type GetState = () => GlobalState;

export { notification, settings, balance, statics, order, error, };
