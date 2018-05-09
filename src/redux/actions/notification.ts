import * as Redux from 'redux';
import { Toast } from 'native-base';

const DANGER = 'danger';
const WARNING = 'warning';
const SUCCESS = 'success';

export type ShowDanger = typeof DANGER;
export type ShowWarning = typeof WARNING;
export type ShowSuccess = typeof SUCCESS;

export type ShowNotification =
  ShowDanger |
  ShowWarning |
  ShowSuccess;

export type NotificationAction = { type: ShowNotification, text: string };

type Dispatch = Redux.Dispatch<NotificationAction, any>;

const displayNotifcation = (type: ShowNotification, text: string) => (dispatch: Dispatch) => {
  dispatch({ text, type });
  Toast.show({ text, type, buttonText: "Okay", position: "bottom", duration: 8000 });
};

export const displaySuccess = (text: string) => displayNotifcation(SUCCESS, text);
export const displayWarning = (text: string) => displayNotifcation(WARNING, text);
export const displayDanger = (text: string) => displayNotifcation(DANGER, text);