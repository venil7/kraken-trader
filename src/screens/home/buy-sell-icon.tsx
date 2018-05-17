import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Thumbnail, Badge, Text } from 'native-base';
import { OrderType, Status } from '../../domain';
import { StyleProp } from 'react-native';
import { ImageStyle } from 'react-native';

const buy = require('../../../assets/actions/buy.png');
const sell = require('../../../assets/actions/sell.png');

type Style = StyleProp<ImageStyle>;

export type BuySellIconProps = {
  orderType: OrderType;
  style?: Style;
};

export const BuyIcon = (props: BuySellIconProps) => (
  <Thumbnail square small style={props.style} source={buy} />
);

const buyOrSell = branch(({ orderType }: BuySellIconProps) =>
  orderType === OrderType.Buy, renderComponent(BuyIcon))

export const SellIcon = (props: BuySellIconProps) => (
  <Thumbnail square small style={props.style} source={sell} />
);

export const BuySellIcon = buyOrSell(SellIcon);
export type StatusBadgeProps = {
  status: Status;
  style?: Style;
};

export const StatusBadge = ({ status, style }: StatusBadgeProps) => {
  switch (status) {
    case Status.Open: return (
      <Badge success style={style}>
        <Text>{status.toString()}</Text>
      </Badge>
    );
    case Status.Closed: return (
      <Badge style={{ backgroundColor: "black", ...style }}>
        <Text>{status.toString()}</Text>
      </Badge>
    );
    case Status.Canceled: return (
      <Badge danger style={style}>
        <Text>{status.toString()}</Text>
      </Badge>
    );
  }
}