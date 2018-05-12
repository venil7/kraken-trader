import React from 'react'
import { Component } from 'react';
import * as Redux from 'redux';
import { Content, Text } from 'native-base';
import { Screen, ScreenProps } from '../common/index';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/reducers';
import { BalanceAction, loadBalancesThunk } from '../../redux/actions/balance';
import { Auth, auth } from '../../services/kraken';
import { BalanceState } from '../../redux/reducers/balance';
import { BalanceCard } from './balance-card';
import { loadOpenOrdersThunk, loadClosedOrdersThunk } from '../../redux/actions/order';
import { OrdersCard } from './orders-card';
import { OrdersState } from '../../redux/reducers/orders';
import { isLoading } from '../../redux/reducers/loading';

type Dispatch = Redux.Dispatch<BalanceAction, any>;

const stateToProps = ({ balance, orders, settings }: GlobalState) => {
  return {
    balance,
    orders,
    auth: auth(settings)
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    loadBalances: (auth: Auth) => dispatch(loadBalancesThunk(auth)),
    loadOpenOrders: (auth: Auth) => dispatch(loadOpenOrdersThunk(auth)),
    loadClosedOrders: (auth: Auth) => dispatch(loadClosedOrdersThunk(auth)),
  };
};

type HomeProps = ScreenProps & {
  balance: BalanceState,
  orders: OrdersState,
  loadBalances: (auth: Auth) => void,
  loadOpenOrders: (auth: Auth) => void,
  loadClosedOrders: (auth: Auth) => void,
  auth: Auth
};

type HomeState = {
  auth: Auth
};

@connect(stateToProps, dispatchToProps)
export class Home extends Component<HomeProps, HomeState> {

  refresh = async () => {
    const { loadBalances, loadOpenOrders, loadClosedOrders, auth } = this.props;
    if (auth.cred) {
      await loadBalances(auth);
      await loadOpenOrders(auth);
      await loadClosedOrders(auth);
    }
  };

  render() {
    const { balance, orders, navigation } = this.props;
    const loading = isLoading(balance.loading, orders.loading);
    return (
      <Screen
        title="Kraken"
        onRefresh={this.refresh}
        navigation={navigation}
        loading={loading}
        render={() => (
          <Content>
            <BalanceCard
              balances={balance.balances} />
            <OrdersCard
              title="Open Orders"
              orders={orders.openOrders} />
            <OrdersCard
              title="Closed Orders"
              orders={orders.closedOrders} />
          </Content>
        )} />
    );
  }
}
