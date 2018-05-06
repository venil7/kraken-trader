import { BalanceAction, LOAD, LOADED } from '../actions/balance';
import { Balance } from '../../domain';
import { LoadingState, EMPTY, LOADING, SUCCESS } from './loading';

export type BalanceState = {
  loading: LoadingState;
  balances: Balance[];
};

const initState: BalanceState = {
  loading: EMPTY,
  balances: []
};

const balance = (state = initState, action: BalanceAction) => {
  switch (action.type) {
    case LOAD: {
      return { ...state, loading: LOADING, balances: [] };
    }
    case LOADED: {
      return { ...state, loading: SUCCESS, balances: action.payload };
    }
    default:
      return state;
  }
};

export { balance };