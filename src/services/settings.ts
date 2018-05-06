import { getItem, setItem } from './storage';
const SETTINGS = 'settings';

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

export const getSettings = async (): Promise<Settings> => {
  const settings = await getItem<Settings>(SETTINGS, defaultSettings);
  return <Settings>{ ...defaultSettings, ...settings };
};

export const setSettings = async (settings: Settings): Promise<Settings> => {
  await setItem(SETTINGS, settings);
  return settings;
};