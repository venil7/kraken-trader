import { SettingsAction, LOADED, SAVED } from "../actions/settings";

export type SettingsState = {
  key: string;
  secret: string;
  balanceThreshold: number;
};

export const defaultSettings: SettingsState = {
  key: '',
  secret: '',
  balanceThreshold: 0,
};

export const settings = (state: SettingsState = defaultSettings, action: SettingsAction) => {
  switch (action.type) {
    case LOADED:
    case SAVED: {
      return action.payload;
    }
    default:
      return state;
  }
};