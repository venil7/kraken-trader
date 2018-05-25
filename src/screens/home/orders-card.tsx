import { Body, Button, Card, CardItem, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { Component } from 'react';
import { ListView } from 'react-native';
import { Order } from '../../domain';
import { orderToText } from '../../services/convert';
import { hideIfNoData } from '../common/hide';
import { CryptoPairIcon } from './crypto-icon';

export type OrdersCardProps = {
  orders: Order[]
  title: string;
  onCancel?: (o: Order) => null;
};

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class OrdersCard_ extends Component<OrdersCardProps> {
  render() {
    const { orders, title, onCancel } = this.props;
    const dataSourceOrders = dataSource.cloneWithRows(orders);
    const renderRightHiddenRow = onCancel
      ? (order: Order) =>
        <Button full danger onPress={() => onCancel(order)}>
          <Icon active name="trash" />
        </Button> : undefined;
    const rightOpenValue = onCancel ? -75 : undefined;
    return (
      <Card>
        <CardItem header>
          <Text>{title}: ({orders.length})</Text>
        </CardItem>
        <List
          dataSource={dataSourceOrders}
          renderRow={(order: Order) => <ListItem first icon key={order.id}>
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
          }
          renderLeftHiddenRow={(_data: Order) =>
            <Button full onPress={() => null}>
              <Icon active name="information-circle" />
            </Button>}
          renderRightHiddenRow={renderRightHiddenRow}
          leftOpenValue={70}
          rightOpenValue={rightOpenValue}
        />
      </Card>
    );
  }
}

const OrdersCard = hideIfNoData(
  (props: OrdersCardProps) => !props.orders.length)(OrdersCard_);

export { OrdersCard };