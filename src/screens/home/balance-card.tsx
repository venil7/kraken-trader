import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Icon, Right, Text } from 'native-base';
import { branch, renderNothing } from 'recompose';
import { Balance } from '../../domain';
import { hideIfNoData } from '../common/hide';
import { CryptoIcon } from './crypto-icon';
import { symbolToName } from '../../services/convert';
import style, { evenRow } from './style';

export type BalanceCardProps = {
  balances: Balance[]
};


class BalanceCard_ extends Component<BalanceCardProps> {
  render() {
    const balances = this.props
      .balances
      .filter(b => b.balance > 0)
      .sort((b1, b2) => b2.balance - b1.balance);
    return (
      <Card>
        <CardItem header>
          <Text>Balances:</Text>
        </CardItem>
        {balances.map((balance: Balance, i: number) => (
          <CardItem key={balance.symbol} style={evenRow(i)}>
            <CryptoIcon symbol={balance.symbol} />
            <Text style={style.marginLeft}>{symbolToName(balance.symbol)}</Text>
            <Right>
              <Text>{balance.balance}</Text>
            </Right>
          </CardItem>
        ))}
      </Card>
    );
  }
}

const BalanceCard = hideIfNoData(
  (props: BalanceCardProps) => !props.balances.length)(BalanceCard_);

export { BalanceCard };