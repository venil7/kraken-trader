import { serializeStore } from '../../services/serialize';
import { DispatchableAction, GetState } from '../actions';

const serializableAction = ({ type }: DispatchableAction) =>
  type.toString().endsWith('*');

export const serialize = ({ getState }: { getState: GetState }) =>
  (next: Function) =>
    (action: DispatchableAction) => {
      const result = next(action);
      if (serializableAction(action)) {
        serializeStore(getState());
      }
      return result
    };