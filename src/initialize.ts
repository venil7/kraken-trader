import { Store } from "redux";
import { auth } from "./services/kraken";
import { loadBalancesThunk, loadedBalances } from "./redux/actions/balance";
import { loadOpenClosedOrdersThunk, loadedOpenOrders, loadedClosedOrders } from "./redux/actions/order";
import { getSerializedStore } from "./services/serialize";
import { loadedSettings } from "./redux/actions/settings";
import { expired } from "./redux/reducers/expire";
import { loadStaticsThunk, loadedStatic, loadedStaticFiat, loadedStaticCrypto } from "./redux/actions/static";
import { GlobalState } from "./redux/reducers";

export const initialize = async (store: Store<GlobalState>) => {
  const { dispatch } = store;
  const { settings, balance, orders, statics } = await getSerializedStore();

  // RESTORE SETTINGS
  dispatch(loadedSettings(settings));

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

  // LOAD/RESTORE ORDERS
  expired(orders)
    ? await loadOpenClosedOrdersThunk()
    : dispatch(loadedOpenOrders(orders.openOrders)),
    dispatch(loadedClosedOrders(orders.closedOrders));
};