import * as Redux from 'redux';
import { Settings, getSettings, setSettings } from '../../services/settings';
import { displaySuccess } from './notification';

export const LOAD = "settings/load";
export const LOADED = "settings/loaded";
export const SAVE = "settings/save";
export const SAVED = "settings/saved";

type Load = typeof LOAD;
type Loaded = typeof LOADED;
type Save = typeof SAVE;
type Saved = typeof SAVED;

export type LoadAction = { type: Load };
export type LoadedAction = { type: Loaded, payload: Settings };
export type SaveAction = { type: Save };
export type SavedAction = { type: Saved, payload: Settings };

export type SettingsAction =
  LoadAction |
  LoadedAction |
  SaveAction |
  SavedAction;

type Dispatch = Redux.Dispatch<SettingsAction, any>;

export const loadSettingsThunk = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOAD });
  const payload = await getSettings();
  dispatch({ type: LOADED, payload });
};

export const saveSettingsThunk = (settings: Settings) => async (dispatch: Dispatch) => {
  dispatch({ type: SAVE });
  const payload = await setSettings(settings);
  dispatch({ type: SAVED, payload });
  dispatch(displaySuccess('Saved!'));
};