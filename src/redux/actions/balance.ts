import { getBalance, auth } from '../../services/kraken';
import { Balance } from '../../domain';
import { displayDanger } from './notification';
import { Dispatch, GetState } from '.';

export const LOAD = "balance/load";
export const LOADED = "balance/loaded";

type Load = typeof LOAD;
type Loaded = typeof LOADED;

export type LoadAction = { type: Load };
export type LoadedAction = { type: Loaded, payload: Balance[] };

export type BalanceAction =
  LoadAction |
  LoadedAction;

export const loadedBalances = (payload: Balance[]): LoadedAction =>
  ({ type: LOADED, payload });

export const loadBalancesThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: LOAD });
    const _auth = auth(getState().settings);
    try {
      const balances = await getBalance(_auth);
      dispatch(loadedBalances(balances));
    } catch ({ message }) {
      dispatch(displayDanger(message));
      dispatch(loadedBalances([]));
    }
  };