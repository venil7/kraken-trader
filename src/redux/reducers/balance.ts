import { Balance } from '../../domain';
import { BalanceAction, LOAD, LOADED } from '../actions/balance';
import { LoadingState, EMPTY, LOADING, SUCCESS } from './loading';
import { Expirable, EXPIRED, expireInMinute } from './expire';

export type BalanceState = Expirable & {
  loading: LoadingState;
  balances: Balance[];
};

const initState: BalanceState = {
  loading: EMPTY,
  balances: [],
  expires: EXPIRED
};

const balance = (state = initState, action: BalanceAction) => {
  switch (action.type) {
    case LOAD: {
      return { ...state, loading: LOADING, balances: [] };
    }
    case LOADED: {
      return { ...state, loading: SUCCESS, balances: action.payload, expires: expireInMinute() };
    }
    default:
      return state;
  }
};

export { balance };