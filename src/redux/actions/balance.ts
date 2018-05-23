import { Dispatch, GetState } from '.';
import { Balance } from '../../domain';
import { auth, getBalance } from '../../services/kraken';
import { displayDanger } from './notification';

export const LOADING_BALANCE = "balance/loading";
export const LOADED_BALANCE = "balance/loaded*";

type LoadingBalance = typeof LOADING_BALANCE;
type LoadedBalance = typeof LOADED_BALANCE;

export type LoadingBalanceAction = { type: LoadingBalance };
export type LoadedBalanceAction = { type: LoadedBalance, payload: Balance[] };

export type BalanceAction =
  LoadingBalanceAction |
  LoadedBalanceAction;

export const loadedBalances = (payload: Balance[]): BalanceAction =>
  ({ type: LOADED_BALANCE, payload });

export const loadBalancesThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: LOADING_BALANCE });
    const _auth = auth(getState().settings);
    try {
      const balances = await getBalance(_auth);
      dispatch(loadedBalances(balances));
    } catch ({ message }) {
      dispatch(displayDanger(message));
      dispatch(loadedBalances([]));
    }
  };