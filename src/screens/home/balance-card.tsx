import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Icon, Right, Text, List, ListItem, Body, Left } from 'native-base';
import { branch, renderNothing } from 'recompose';
import { Balance } from '../../domain';
import { hideIfNoData } from '../common/hide';
import { CryptoIcon } from './crypto-icon';
import { symbolToName, toAmount } from '../../services/convert';
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
        <List>
          {balances.map((balance: Balance) => (
            <ListItem icon key={balance.symbol} >
              <Left>
                <CryptoIcon symbol={balance.symbol} />
              </Left>
              <Body>
                <Text>{symbolToName(balance.symbol)}</Text>
                <Text note>some text</Text>
              </Body>
              <Right>
                <Text>{toAmount(balance.balance, balance.symbol)}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Card>
    );
  }
}

const BalanceCard = hideIfNoData(
  (props: BalanceCardProps) => !props.balances.length)(BalanceCard_);

export { BalanceCard };