import { SettingsAction, LOADED, SAVED } from "../actions/settings";

export type Settings = {
  key: string;
  secret: string;
  balanceThreshold: number;
};

export const defaultSettings: Settings = {
  key: '',
  secret: '',
  balanceThreshold: 0,
};

export const settings = (state: Settings = defaultSettings, action: SettingsAction) => {
  switch (action.type) {
    case LOADED:
    case SAVED: {
      return action.payload;
    }
    default:
      return state;
  }
};