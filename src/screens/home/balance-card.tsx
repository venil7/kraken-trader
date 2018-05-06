import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Icon, Right, Text } from 'native-base';
import { Balance } from '../../domain';

export type BalanceCardProps = {
  balances: Balance[]
};

export class BalanceCard extends Component<BalanceCardProps> {
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
        {balances.map(b => (
          <CardItem key={b.symbol}>
            <Icon type="MaterialCommunityIcons" name="coin" />
            <Text>{b.symbol}</Text>
            <Right>
              <Text>{b.balance}</Text>
            </Right>
          </CardItem>
        ))}
      </Card>
    );
  }
}
