import { Store } from "redux";
import { auth } from "./services/kraken";
import { loadBalancesThunk, loadedBalances } from "./redux/actions/balance";
import { loadOpenOrdersThunk, loadClosedOrdersThunk, loadedClosedOrders, loadedOpenOrders } from "./redux/actions/order";
import { getStore } from "./services/serialize";
import { loadedSettings } from "./redux/actions/settings";
import { expired } from "./redux/reducers/expire";

export const initialize = async (store: Store) => {
  const { dispatch } = store;
  const { settings, balance, orders } = await getStore();
  await dispatch(loadedSettings(settings))
  const _auth = auth(settings);
  expired(balance)
    ? await dispatch(loadBalancesThunk(_auth))
    : dispatch(loadedBalances(balance.balances));
  // await dispatch(loadedBalances(balance.balances));
  await dispatch(loadedOpenOrders(orders.openOrders));
  await dispatch(loadedClosedOrders(orders.closedOrders));
  // await dispatch(loadBalancesThunk(_auth));
  // await dispatch(loadOpenOrdersThunk(_auth));
  // await dispatch(loadClosedOrdersThunk(_auth));
};