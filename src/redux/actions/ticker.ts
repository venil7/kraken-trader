import { Ticker } from "../../domain";
import { getTickerInfo } from "../../services/kraken";
import { Dispatch, GetState } from "./index";
import { displayDanger } from "./notification";

export const LOAD_TICKER = "ticker/load";
export const LOADED_TICKER = "ticker/loaded";

type LoadTicker = typeof LOAD_TICKER;
type LoadedTicker = typeof LOADED_TICKER;

export type LoadTickerAction = { type: LoadTicker };
export type LoadedTickerAction = { type: LoadedTicker, payload: Ticker[] };

export type TickerAction =
  | LoadTickerAction
  | LoadedTickerAction;

export const loadedTickers = (payload: Ticker[]): TickerAction =>
  ({ type: LOADED_TICKER, payload });

export const loadTickersThunk = () =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: LOAD_TICKER });
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