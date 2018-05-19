import { Balance } from '../../domain';
import { BalanceAction, LOADED_BALANCE, LOAD_BALANCE } from '../actions/balance';
import { EXPIRED, Expirable, expireInHour } from './expire';
import { Loadable, LoadingState } from './loading';

export type BalanceState = Expirable & Loadable & {
  balances: Balance[];
};

const initState: BalanceState = {
  loading: LoadingState.Empty,
  balances: [],
  expires: EXPIRED
};

const balance = (state = initState, action: BalanceAction) => {
  switch (action.type) {
    case LOAD_BALANCE: {
      return { ...state, loading: LoadingState.Loading, balances: [] };
    }
    case LOADED_BALANCE: {
      return {
        ...state, loading: LoadingState.Success,
        balances: action.payload,
        expires: expireInHour()
      };
    }
    default:
      return state;
  }
};

export { balance };