import { Ticker } from "../../domain";
import { LOADED_TICKER, LOAD_TICKER, TickerAction } from "../actions/ticker";
import { EXPIRED, Expirable, expireInHour } from "./expire";
import { Loadable, LoadingState } from "./loading";

export type TickerState = Expirable & Loadable & {
  tickers: Ticker[],
};

const initialState: TickerState = {
  loading: LoadingState.Empty,
  expires: EXPIRED,
  tickers: [],
};

export const ticker = (state: TickerState = initialState, action: TickerAction) => {
  switch (action.type) {
    case LOAD_TICKER:
      return { ...state, loading: LoadingState.Loading };
    case LOADED_TICKER:
      return {
        ...state, tickers: action.payload,
        loading: LoadingState.Success,
        expires: expireInHour()
      };
  }
  return state;
};