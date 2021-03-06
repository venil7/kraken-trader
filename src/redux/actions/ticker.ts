import { CurrencyType, Ticker } from "../../domain";
import { getTickerInfo } from "../../services/kraken";
import { addError } from "./error";
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
    const symbols = balance.balances
      .filter(a => a.currencyType !== CurrencyType.Fiat)
      .map(a => a.symbol);
    try {
      const tickers = await getTickerInfo(settings.prefFiat, symbols);
      dispatch(loadedTickers(tickers));
    } catch (error) {
      dispatch(addError(error));
      dispatch(displayDanger(error.message));
      dispatch(loadedTickers([]));
    }
  };