import { Content } from "native-base";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "../../redux/actions";
import { loadBalancesThunk } from "../../redux/actions/balance";
import { loadClosedOrdersThunk, loadOpenOrdersThunk } from "../../redux/actions/order";
import { loadTickersThunk } from "../../redux/actions/ticker";
import { GlobalState } from "../../redux/reducers";
import { BalanceState } from "../../redux/reducers/balance";
import { isLoading } from "../../redux/reducers/loading";
import { OrdersState } from "../../redux/reducers/orders";
import { SettingsState } from "../../redux/reducers/settings";
import { TickerState } from "../../redux/reducers/ticker";
import { Screen, ScreenProps } from "../common/index";
import { BalanceCard } from "./balance-card";
import { OrdersCard } from "./orders-card";

const stateToProps = ({ balance, orders, ticker, settings }: GlobalState) => {
  return {
    balance,
    orders,
    ticker,
    settings,
  };
};

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
  balance: BalanceState;
  orders: OrdersState;
  ticker: TickerState;
  settings: SettingsState;
  refresh: () => void;
};

@connect(stateToProps, dispatchToProps)
export class Home extends Component<HomeProps, any> {
  render() {
    const { balance, orders, navigation, ticker, settings } = this.props;
    const { excludeZeroBalance } = settings;
    const balances = balance.balances
      .filter(b => excludeZeroBalance ? b.balance > 0 : true)
    const loading = isLoading(balance.loading, orders.loading);
    return (
      <Screen
        title="Kraken Trader"
        onRefresh={this.props.refresh}
        navigation={navigation}
        loading={loading}
        render={() => (
          <Content>
            <BalanceCard balances={balances} tickers={ticker.tickers} />
            <OrdersCard title="Open Orders" orders={orders.openOrders} />
            <OrdersCard title="Closed Orders" orders={orders.closedOrders} />
          </Content>
        )}
      />
    );
  }
}
