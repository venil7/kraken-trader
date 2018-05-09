/// <reference path="kraken-wrapper.d.ts" />
import { ApiOrder } from 'kraken-wrapper';
import { Order, Status, OrderType } from "../domain";

export const toDate = (n: number) => new Date(n * 1000);

export const toOrder = (id: string, body: ApiOrder): Order => {
  const { descr } = body;
  return {
    id,
    refid: body.refid,
    userref: body.userref,
    status: body.status as Status,
    opentm: toDate(body.opentm),
    starttm: toDate(body.starttm),
    expiretm: toDate(body.expiretm),
    descr: {
      pair: descr.pair,
      type: descr.type as OrderType,
      ordertype: descr.ordertype,
      price: parseFloat(descr.price),
      price2: parseFloat(descr.price2),
      leverage: descr.leverage,
      order: descr.order,
      close: descr.close
    },
    vol: parseFloat(body.vol),
    vol_exec: parseFloat(body.vol_exec),
    cost: parseFloat(body.cost),
    fee: parseFloat(body.fee),
    price: parseFloat(body.price),
    stopprice: parseFloat(body.stopprice),
    limitprice: parseFloat(body.limitprice),
    misc: body.misc,
    oflags: body.oflags
  }
};
