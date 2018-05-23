import { Symbol } from "../../domain";
import { SAVED_SETTING, SAVED_SETTINGS, SettingsAction } from "../actions/settings";

export type PartialSettings = Partial<SettingsState>;

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
    case SAVED_SETTINGS:
    case SAVED_SETTING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};