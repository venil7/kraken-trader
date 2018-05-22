import { createSelector } from "reselect";
import { BalanceWithTicker, Status, Symbol, Ticker } from "../../domain";
import { GlobalState } from "../reducers";
import { BalanceState, BalanceWithTickerState } from "../reducers/balance";
import { OrdersState } from "../reducers/orders";
import { SettingsState } from "../reducers/settings";
import { StaticState } from "../reducers/static";
import { TickerState } from "../reducers/ticker";

export const balancesSelector = ({ balance }: GlobalState): BalanceState => balance;
export const ordersSelector = ({ orders }: GlobalState): OrdersState => orders;
export const staticSelector = ({ statics }: GlobalState): StaticState => statics;
export const tickerSelector = ({ ticker }: GlobalState): TickerState => ticker;
export const settingsSelector = ({ settings }: GlobalState): SettingsState => settings;

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

export const userClosedOrdersSelector = createSelector(
  [ordersSelector, settingsSelector],
  (ordersState, { excludeCancelledOrders }): OrdersState => ({
    ...ordersState,
    closedOrders: ordersState.closedOrders.filter(
      order => excludeCancelledOrders
        ? order.status !== Status.Canceled
        : true)
  })
);
