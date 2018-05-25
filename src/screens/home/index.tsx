import { Content } from "native-base";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "../../redux/actions";
import { loadBalancesThunk } from "../../redux/actions/balance";
import { loadClosedOrdersThunk, loadOpenOrdersThunk } from "../../redux/actions/order";
import { loadTickersThunk } from "../../redux/actions/ticker";
import { BalanceWithTickerState } from "../../redux/reducers/balance";
import { isLoading } from "../../redux/reducers/loading";
import { OrdersState } from "../../redux/reducers/orders";
import { SettingsState } from "../../redux/reducers/settings";
import { balancesWithTickerTotalSelector, settingsSelector, userBalancesWithTickerSelector, userClosedOrdersSelector } from "../../redux/selectors";
import { Screen, ScreenProps } from "../common/index";
import { BalanceCard } from "./balance-card";
import { OrdersCard } from "./orders-card";

const stateToProps = createSelector(
  userBalancesWithTickerSelector,
  balancesWithTickerTotalSelector,
  settingsSelector,
  userClosedOrdersSelector,
  (balance, total, settings, orders) => ({ balance, orders, total, settings })
);

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    refresh: async () => {
      await dispatch(loadBalancesThunk());
      await dispatch(loadTickersThunk());
      await dispatch(loadOpenOrdersThunk());
      await dispatch(loadClosedOrdersThunk());
    }
  };
};

type HomeProps = ScreenProps & {
  balance: BalanceWithTickerState;
  orders: OrdersState;
  total: number;
  settings: SettingsState;
  refresh: () => void;
};

@connect(stateToProps, dispatchToProps)
export class Home extends Component<HomeProps, any> {
  render() {
    const { balance, orders, navigation, total, settings } = this.props;
    const { balances } = balance;
    const loading = isLoading(balance.loading, orders.loading);
    return (
      <Screen
        title="Kraken Trader"
        onRefresh={this.props.refresh}
        navigation={navigation}
        loading={loading}
        render={() => (
          <Content>
            <BalanceCard
              balances={balances}
              total={total}
              totalSymbol={settings.prefFiat} />
            <OrdersCard
              title="Open Orders"
              onCancel={(o) => alert('deleted')}
              orders={orders.openOrders} />
            <OrdersCard
              title="Closed Orders"
              orders={orders.closedOrders} />
          </Content>
        )}
      />
    );
  }
}
