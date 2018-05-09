import * as Redux from 'redux';
import { getBalance } from '../../services/kraken';
import { Balance } from '../../domain';
import { Auth } from '../../services/kraken';
import { displayDanger } from './notification';

export const LOAD = "balance/load";
export const LOADED = "balance/loaded";

type Load = typeof LOAD;
type Loaded = typeof LOADED;

export type LoadAction = { type: Load };
export type LoadedAction = { type: Loaded, payload: Balance[] };

export type BalanceAction =
  LoadAction |
  LoadedAction;

type Dispatch = Redux.Dispatch<BalanceAction, any>;

export const queryBalanceThunk = (auth: Auth) => async (dispatch: Dispatch) => {
  dispatch({ type: LOAD });
  try {
    const balances = await getBalance(auth);
    dispatch({ type: LOADED, payload: balances });
  } catch ({ message }) {
    dispatch(displayDanger(message));
    dispatch({ type: LOADED, payload: [] });
  }
};