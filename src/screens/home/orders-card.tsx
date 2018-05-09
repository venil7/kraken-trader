import React from 'react'
import { Component } from 'react';
import { Card, CardItem, Icon, Right, Text } from 'native-base';
import { Order } from '../../domain';

export type OrdersCardProps = {
  orders: Order[]
  title: string;
};

export class OrdersCard extends Component<OrdersCardProps> {
  render() {
    const { orders, title } = this.props
    return (
      <Card>
        <CardItem header>
          <Text>{title}: ({orders.length})</Text>
        </CardItem>
        {orders.map((order: Order) => (
          <CardItem key={order.id}>
            <Icon type="Feather" name="shopping-cart" />
            <Text>{order.descr.pair}</Text>
            <Right>
              <Text>{order.descr.order}</Text>
            </Right>
          </CardItem>
        ))}
      </Card>
    );
  }
}
