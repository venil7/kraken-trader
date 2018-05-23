import { PartialSettings, SettingsState, defaultSettings } from '../reducers/settings';
import { Dispatch } from './index';
import { displayDanger, displaySuccess } from './notification';

export const SAVING_SETTINGS = "settings/saving";
export const SAVED_SETTINGS = "settings/saved*";
export const SAVED_SETTING = "setting/saved*";

type SavingSettings = typeof SAVING_SETTINGS;
type SavedSettings = typeof SAVED_SETTINGS;
type SavedSetting = typeof SAVED_SETTING;

type SavingSettingsAction = { type: SavingSettings };
type SavedSettingsAction = { type: SavedSettings, payload: SettingsState };
type SavedSettingAction = { type: SavedSetting, payload: PartialSettings };

export type SettingsAction =
  | SavingSettingsAction
  | SavedSettingsAction
  | SavedSettingAction;

export const saveSettings = (payload: SettingsState): SettingsAction =>
  ({ type: SAVED_SETTINGS, payload });

export const saveSetting = (payload: PartialSettings): SettingsAction =>
  ({ type: SAVED_SETTING, payload });

export const saveSettingsThunk = (settings: SettingsState) => (dispatch: Dispatch) => {
  dispatch({ type: SAVING_SETTINGS });
  try {
    dispatch(saveSettings(settings));
    dispatch(displaySuccess('Saved!'));
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch(saveSettings(defaultSettings));
  }
};

export const saveSettingThunk = (settings: Partial<SettingsState>) => (dispatch: Dispatch) => {
  dispatch({ type: SAVING_SETTINGS });
  try {
    dispatch(saveSetting(settings));
    dispatch(displaySuccess('Saved!'));
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch(saveSettings(defaultSettings));
  }
};