import * as Redux from 'redux';
import * as notification from './notification';
import * as settings from './settings';
import * as balance from './balance';
import * as order from './order';

export type DispatchableAction =
  | notification.NotificationAction
  | settings.SettingsAction
  | balance.BalanceAction
  | order.OrderAction;

export type Dispatch = Redux.Dispatch<DispatchableAction, any>;

export {
  notification,
  settings,
  balance,
  order,
};