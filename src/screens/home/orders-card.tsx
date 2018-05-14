import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Icon, Right, Text } from 'native-base';
import { Order } from '../../domain';
import { hideIfNoData } from '../common/hide';
import style, { evenRow } from './style';
import { BuySellIcon } from './buy-sell-icon';
import { CryptoPairIcon } from './crypto-icon';

export type OrdersCardProps = {
  orders: Order[]
  title: string;
};


class OrdersCard_ extends Component<OrdersCardProps> {
  render() {
    const { orders, title } = this.props
    return (
      <Card>
        <CardItem header>
          <Text>{title}: ({orders.length})</Text>
        </CardItem>
        {orders.map((order: Order, i: number) => (
          <CardItem key={order.id} style={evenRow(i)}>
            <BuySellIcon order={order} />
            <CryptoPairIcon pair={order.descr.pair} />
            <Text style={style.marginLeft}>{order.status}</Text>
            <Right>
              <Text>{order.vol}</Text>
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