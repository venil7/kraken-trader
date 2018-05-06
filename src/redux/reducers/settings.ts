import { Settings, defaultSettings } from "../../services/settings";
import { SettingsAction, LOADED, SAVED } from "../actions/settings";

export type SettingsState = Settings;

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