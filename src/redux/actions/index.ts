import * as Redux from 'redux';
import * as notification from './notification';
import * as settings from './settings';
import * as balance from './balance';
import * as statics from './static';
import * as ticker from './ticker';
import * as order from './order';

import { GlobalState } from '../reducers';

export type DispatchableAction =
  | notification.NotificationAction
  | settings.SettingsAction
  | balance.BalanceAction
  | statics.StaticAction
  | ticker.TickerAction
  | order.OrderAction;

export type Dispatch = Redux.Dispatch<DispatchableAction, any>;
export type GetState = () => GlobalState;

export {
  notification,
  settings,
  balance,
  statics,
  order,
};