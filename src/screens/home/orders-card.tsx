import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Right, Text, List, ListItem, Body, Left } from 'native-base';
import { Order } from '../../domain';
import { hideIfNoData } from '../common/hide';
import { CryptoPairIcon } from './crypto-icon';
import { orderToText } from '../../services/convert';
import { evenRow } from './style';

export type OrdersCardProps = {
  orders: Order[]
  title: string;
};


class OrdersCard_ extends Component<OrdersCardProps> {
  render() {
    const { orders, title } = this.props;
    return (
      <Card>
        <CardItem header>
          <Text>{title}: ({orders.length})</Text>
        </CardItem>
        <List>
          {orders.map((order: Order) => (
            <ListItem first icon key={order.id}>
              <Left>
                <CryptoPairIcon pair={order.pair} orderType={order.type} />
              </Left>
              <Body>
                <Text>{orderToText(order)}</Text>
                <Text note>{order.status}</Text>
              </Body>
              <Right>
                <Text>{order.type}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Card>
    );
  }
}

const OrdersCard = hideIfNoData(
  (props: OrdersCardProps) => !props.orders.length)(OrdersCard_);

export { OrdersCard };