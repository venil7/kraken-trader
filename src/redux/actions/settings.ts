import { displaySuccess, displayDanger } from './notification';
import { SettingsState, defaultSettings } from '../reducers/settings';
import { Dispatch } from '.';

export const LOADED = "settings/loaded";
export const SAVE = "settings/save";
export const SAVED = "settings/saved";

type Loaded = typeof LOADED;
type Save = typeof SAVE;
type Saved = typeof SAVED;

export type LoadedAction = { type: Loaded, payload: SettingsState };
export type SaveAction = { type: Save };
export type SavedAction = { type: Saved, payload: SettingsState };

export type SettingsAction =
  LoadedAction |
  SaveAction |
  SavedAction;

export const loadedSettings = (payload: SettingsState): LoadedAction => {
  return { type: LOADED, payload };
}

export const saveSettingsThunk = (settings: SettingsState) => (dispatch: Dispatch) => {
  dispatch({ type: SAVE });
  try {
    dispatch(loadedSettings(settings));
    dispatch(displaySuccess('Saved!'));
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch(loadedSettings(defaultSettings));
  }
};