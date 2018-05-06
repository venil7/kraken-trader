import React from 'react'
import { Component } from 'react';
import * as Redux from 'redux';
import { Text, Button, Content, Icon } from 'native-base';
import { Screen, ScreenProps } from '../common/index';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/reducers';
import { BalanceAction, queryBalanceThunk } from '../../redux/actions/balance';
import { Auth, auth } from '../../services/kraken';
import { BalanceState } from '../../redux/reducers/balance';
import { BalanceCard } from './balance-card';

type Dispatch = Redux.Dispatch<BalanceAction, any>;

const stateToProps = ({ balance, settings }: GlobalState) => {
  return {
    balance,
    auth: auth(settings)
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    loadBalances: (auth: Auth) =>
      dispatch(queryBalanceThunk(auth))
  };
};

type HomeProps = ScreenProps & {
  balance: BalanceState,
  loadBalances: (auth: Auth) => void,
  auth: Auth
};

type HomeState = {
  auth: Auth
};

@connect(stateToProps, dispatchToProps)
export class Home extends Component<HomeProps, HomeState> {

  refresh = () => {
    const { loadBalances, auth } = this.props;
    if (auth.cred) {
      loadBalances(auth);
    }
  };

  componentDidMount() {
    this.refresh();
  }


  render() {
    const { balance, navigation } = this.props;
    return (
      <Screen
        title="Kraken"
        refresh={this.refresh}
        navigation={navigation}
        render={(props) => (
          <Content>
            <BalanceCard
              balances={balance.balances} />
          </Content>
        )} />
    );
  }
}
