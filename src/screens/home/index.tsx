import React from 'react'
import { Component } from 'react';
import * as Redux from 'redux';
import { Text } from 'native-base';
import { Screen, ScreenProps } from '../common/index';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/reducers';
import { Balance } from '../../domain';
import { BalanceAction, queryBalanceThunk } from '../../redux/actions/balance';
import { Auth, auth } from '../../services/kraken';
import { BalanceState } from '../../redux/reducers/balance';

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

@connect(stateToProps, dispatchToProps)
export class Home extends Component<HomeProps> {

  render() {
    const balances = JSON.stringify(this.props.balance.balances, null, 2);
    return (
      <Screen
        title="Home"
        navigation={this.props.navigation}
        render={(props) => (
          <Text>
            {balances}
          </Text>
        )} />
    );
  }

  componentDidUpdate() {
    const { loadBalances, auth } = this.props;
    loadBalances(auth);
  }
}
