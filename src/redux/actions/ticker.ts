import { Ticker } from "../../domain";
import { getTickerInfo } from "../../services/kraken";
import { Dispatch, GetState } from "./index";
import { displayDanger } from "./notification";

export const LOADING_TICKER = "ticker/loading";
export const LOADED_TICKER = "ticker/loaded*";

type LoadingTicker = typeof LOADING_TICKER;
type LoadedTicker = typeof LOADED_TICKER;

export type LoadingTickerAction = { type: LoadingTicker };
export type LoadedTickerAction = { type: LoadedTicker, payload: Ticker[] };

export type TickerAction =
  | LoadingTickerAction
  | LoadedTickerAction;

export const loadedTickers = (payload: Ticker[]): TickerAction =>
  ({ type: LOADED_TICKER, payload });

export const loadTickersThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: LOADING_TICKER });
    const { balance, settings } = getState();
    const symbols = balance
      .balances
      .filter(a => a.balance > 0)
      .map(a => a.symbol);
    try {
      const tickers = await getTickerInfo(settings.prefFiat, symbols);
      dispatch(loadedTickers(tickers));
    } catch ({ message }) {
      dispatch(displayDanger(message));
      dispatch(loadedTickers([]));
    }
  };