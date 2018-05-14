import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Thumbnail } from 'native-base';
import { Order, OrderType } from '../../domain';

const buy = require('../../../assets/actions/buy.png');
const sell = require('../../../assets/actions/sell.png');

export type HasOrder = { order: Order };

export const BuyIcon = () => (
  <Thumbnail square small source={buy} />
);

const buyOrSell = branch(({ order }: HasOrder) =>
  order.descr.type === OrderType.Buy, renderComponent(BuyIcon))

export const SellIcon = () => (
  <Thumbnail square small source={sell} />
);

export const BuySellIcon = buyOrSell(SellIcon);