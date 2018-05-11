import { saveStore } from '../../services/serialize';
import { GlobalState } from '../reducers';
import { AnyAction } from 'redux';

export const serialize = ({ getState }: { getState: () => GlobalState }) =>
  (next: Function) =>
    (action: AnyAction) => {
      const result = next(action);
      saveStore(getState());
      return result
    };