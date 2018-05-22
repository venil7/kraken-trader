import { SettingsState, defaultSettings } from '../reducers/settings';
import { Dispatch } from './index';
import { displayDanger, displaySuccess } from './notification';

export const SETTINGS_SAVING = "settings/saving";
export const SETTINGS_SAVED = "settings/saved";
export const SETTING_SAVED = "setting/saved";

type SettingsSave = typeof SETTINGS_SAVING;
type SettingsSaved = typeof SETTINGS_SAVED;
type SettingSaved = typeof SETTING_SAVED;

type SettingsSavingAction = { type: SettingsSave };
type SettingsSavedAction = { type: SettingsSaved, payload: SettingsState };
type SettingSavedAction = { type: SettingSaved, payload: Partial<SettingsState> };

export type SettingsAction =
  | SettingsSavingAction
  | SettingsSavedAction
  | SettingSavedAction;

export const saveSettings = (payload: SettingsState): SettingsAction =>
  ({ type: SETTINGS_SAVED, payload });

export const saveSetting = (payload: Partial<SettingsState>): SettingsAction =>
  ({ type: SETTING_SAVED, payload });

export const saveSettingsThunk = (settings: SettingsState) => (dispatch: Dispatch) => {
  dispatch({ type: SETTINGS_SAVING });
  try {
    dispatch(saveSettings(settings));
    dispatch(displaySuccess('Saved!'));
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch(saveSettings(defaultSettings));
  }
};

export const saveSettingThunk = (settings: Partial<SettingsState>) => (dispatch: Dispatch) => {
  dispatch({ type: SETTINGS_SAVING });
  try {
    dispatch(saveSetting(settings));
    dispatch(displaySuccess('Saved!'));
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch(saveSettings(defaultSettings));
  }
};