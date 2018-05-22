import { createSelector } from "reselect";
import { BalanceWithTicker, Symbol, Ticker } from "../../domain";
import { GlobalState } from "../reducers";
import { BalanceState, BalanceWithTickerState } from "../reducers/balance";

export const balancesSelector = (state: GlobalState) => state.balance;
export const ordersSelector = (state: GlobalState) => state.orders;
export const staticSelector = (state: GlobalState) => state.statics;
export const tickerSelector = (state: GlobalState) => state.ticker;
export const settingsSelector = (state: GlobalState) => state.settings;

export const userBalancesSelector = createSelector(
  balancesSelector,
  settingsSelector,
  (balancesState, { excludeZeroBalance }): BalanceState => {
    return {
      ...balancesState,
      balances: balancesState.balances.filter(
        b => excludeZeroBalance ? b.balance > 0.0001 : true)
    };
  }
);

export const userBalancesWithTickerSelector = createSelector(
  userBalancesSelector,
  tickerSelector,
  (balancesState, { tickers }): BalanceWithTickerState => {
    const tickerForSymbol = (tickers: Ticker[], base: Symbol) =>
      tickers.find(t => t.base === base);
    const balances = balancesState.balances.map((b: BalanceWithTicker) => ({
      ...b,
      ticker: tickerForSymbol(tickers, b.symbol)
    }));
    return {
      ...balancesState,
      balances,
    };
  }
);

export const balancesWithTickerTotalSelector = createSelector(
  userBalancesWithTickerSelector,
  ({ balances }: BalanceWithTickerState): Number =>
    balances.reduce(
      (acc, b) => b.ticker
        ? acc + (b.ticker.last * b.balance)
        : acc, 0)
);
