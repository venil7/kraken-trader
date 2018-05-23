import { Symbol } from "../../domain";
import { SETTINGS_SAVED, SETTING_SAVED, SettingsAction } from "../actions/settings";

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
    case SETTINGS_SAVED:
    case SETTING_SAVED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};