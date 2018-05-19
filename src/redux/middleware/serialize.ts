import { serializeStore } from '../../services/serialize';
import { GetState, DispatchableAction } from '../actions';

const serializableAction = (action: DispatchableAction) => true;

export const serialize = ({ getState }: { getState: GetState }) =>
  (next: Function) =>
    (action: DispatchableAction) => {
      const result = next(action);
      if (serializableAction(action)) {
        serializeStore(getState());
      }
      return result
    };