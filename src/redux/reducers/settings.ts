import { Symbol } from "../../domain";
import { LOADED, SAVED, SettingsAction } from "../actions/settings";

export type SettingsState = {
  key: string;
  secret: string;
  prefFiat: Symbol;
  excludeZeroBalance: boolean;
  excludeCancelledOrders: boolean;
};

export const defaultSettings: SettingsState = {
  key: '',
  secret: '',
  prefFiat: Symbol.USD,
  excludeZeroBalance: true,
  excludeCancelledOrders: true,
};

export const settings = (state: SettingsState = defaultSettings, action: SettingsAction) => {
  switch (action.type) {
    case LOADED:
    case SAVED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};