import { Store } from "redux";
import { loadBalancesThunk, loadedBalances } from "./redux/actions/balance";
import { loadOpenClosedOrdersThunk, loadedClosedOrders, loadedOpenOrders } from "./redux/actions/order";
import { saveSettings } from "./redux/actions/settings";
import { loadStaticsThunk, loadedStaticCrypto, loadedStaticFiat } from "./redux/actions/static";
import { loadTickersThunk } from "./redux/actions/ticker";
import { GlobalState } from "./redux/reducers";
import { expired } from "./redux/reducers/expire";
import { getSerializedStore } from "./services/serialize";

export const initialize = async (store: Store<GlobalState>) => {
  const { dispatch } = store;
  const { settings, balance, orders, statics } = await getSerializedStore();

  // RESTORE SETTINGS
  dispatch(saveSettings(settings));

  // LOAD/RESTORE STATICS
  // await dispatch(loadStaticsThunk());
  expired(statics)
    ? await dispatch(loadStaticsThunk())
    : dispatch(loadedStaticFiat(statics.fiats)),
    dispatch(loadedStaticCrypto(statics.cryptos));


  // LOAD/RESTORE BALANCES
  expired(balance)
    ? await dispatch(loadBalancesThunk())
    : dispatch(loadedBalances(balance.balances));

  // LOAD/RESTORE TICKERS
  await dispatch(loadTickersThunk());

  // LOAD/RESTORE ORDERS
  expired(orders)
    ? await loadOpenClosedOrdersThunk()
    : dispatch(loadedOpenOrders(orders.openOrders)),
    dispatch(loadedClosedOrders(orders.closedOrders));
};