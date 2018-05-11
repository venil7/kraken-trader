import { getItem, setItem } from './storage';
import { GlobalState, reducer } from '../redux/reducers';
const STORE = 'store';

export const getStore = async (): Promise<GlobalState> => {
  const store = await getItem<GlobalState>(STORE, () => reducer(undefined, { type: '@@NONE' }));
  return store;
};

export const saveStore = async (store: GlobalState): Promise<GlobalState> => {
  await setItem(STORE, store);
  return store;
};