import debounce from 'lodash.debounce';
import { serializeStore } from '../../services/serialize';
import { DispatchableAction, GetState } from '../actions';

const serializableAction = ({ type }: DispatchableAction) =>
  type.toString().endsWith('*');

const serializeStore_ = debounce(serializeStore, 1000);

export const serialize = ({ getState }: { getState: GetState }) =>
  (next: Function) =>
    (action: DispatchableAction) => {
      const result = next(action);
      if (serializableAction(action)) {
        serializeStore_(getState());
      }
      return result
    };