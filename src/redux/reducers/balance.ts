import { Balance } from '../../domain';
import { BalanceAction, LOAD, LOADED } from '../actions/balance';
import { EMPTY, LOADING, SUCCESS, Loadable } from './loading';
import { Expirable, EXPIRED, expireInMinute, expireInHour } from './expire';

export type BalanceState = Expirable & Loadable & {
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
      return {
        ...state, loading: SUCCESS,
        balances: action.payload,
        expires: expireInHour()
      };
    }
    default:
      return state;
  }
};

export { balance };