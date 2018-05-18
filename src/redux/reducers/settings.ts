import { SettingsAction, LOADED, SAVED } from "../actions/settings";
import { Symbol } from "../../domain";

export type SettingsState = {
  key: string;
  secret: string;
  balanceThreshold: number;
  baseFiatSymbol: Symbol;
};

export const defaultSettings: SettingsState = {
  key: '',
  secret: '',
  balanceThreshold: 0,
  baseFiatSymbol: Symbol.USD
};

export const settings = (state: SettingsState = defaultSettings, action: SettingsAction) => {
  switch (action.type) {
    case LOADED:
    case SAVED: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};