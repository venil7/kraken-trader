import * as Redux from 'redux';
import { displaySuccess, displayDanger } from './notification';
import { Settings, defaultSettings } from '../reducers/settings';

export const LOADED = "settings/loaded";
export const SAVE = "settings/save";
export const SAVED = "settings/saved";

type Loaded = typeof LOADED;
type Save = typeof SAVE;
type Saved = typeof SAVED;

export type LoadedAction = { type: Loaded, payload: Settings };
export type SaveAction = { type: Save };
export type SavedAction = { type: Saved, payload: Settings };

export type SettingsAction =
  LoadedAction |
  SaveAction |
  SavedAction;

type Dispatch = Redux.Dispatch<SettingsAction, any>;

export const loadedSettings = (payload: Settings): LoadedAction => {
  return { type: LOADED, payload };
}

export const saveSettingsThunk = (settings: Settings) => (dispatch: Dispatch) => {
  dispatch({ type: SAVE });
  try {
    dispatch(loadedSettings(settings));
    dispatch(displaySuccess('Saved!'));
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch(loadedSettings(defaultSettings));
  }
};