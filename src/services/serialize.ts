import { GlobalState, reducer } from '../redux/reducers';
import { getItem, setItem } from './storage';
const STORE = 'store';

export const getSerializedStore = async (): Promise<GlobalState> => {
  const store = await getItem<GlobalState>(STORE, () => reducer(undefined, { type: '@@NONE' }));
  return store;
};

export const serializeStore = async (store: GlobalState): Promise<GlobalState> => {
  await setItem(STORE, store);
  return store;
};