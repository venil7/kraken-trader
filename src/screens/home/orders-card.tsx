import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Right, Text } from 'native-base';
import { Order } from '../../domain';
import { hideIfNoData } from '../common/hide';
import style, { evenRow } from './style';
import { StatusBadge } from './buy-sell-icon';
import { CryptoPairIcon } from './crypto-icon';
import { orderToText } from '../../services/convert';

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
        {orders.map((order: Order, i: number) => (
          <CardItem key={order.id} style={evenRow(i)}>
            <CryptoPairIcon pair={order.pair} orderType={order.type} />
            <StatusBadge status={order.status} style={style.marginLeft} />
            <Right>
              <Text>{orderToText(order)}</Text>
            </Right>
          </CardItem>
        ))}
      </Card>
    );
  }
}

const OrdersCard = hideIfNoData(
  (props: OrdersCardProps) => !props.orders.length)(OrdersCard_);

export { OrdersCard };