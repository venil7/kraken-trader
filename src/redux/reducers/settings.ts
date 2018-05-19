import { Symbol } from "../../domain";
import { LOADED, SAVED, SettingsAction } from "../actions/settings";

export type SettingsState = {
  key: string;
  secret: string;
  excludeZeroBalance: boolean;
  prefFiat: Symbol;
};

export const defaultSettings: SettingsState = {
  key: '',
  secret: '',
  excludeZeroBalance: true,
  prefFiat: Symbol.USD
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